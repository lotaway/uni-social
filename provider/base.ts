import Uni from '../utils/uni';
import initConfig from "../config/init_config";
import Logger from "../utils/logger";

interface IFProvider {
    request: (...params: any) => {}
}

interface BaseProviderOptions extends Object {
    HOST?: string
    HOST_API?: string
}

interface StoreValue extends Object {
    updateTime: number
    data: object
}

interface ConvertObject extends Object {
    [prop: string]: any
}

interface ConvertArray extends Array<ConvertArray | ConvertObject> {
}

interface AttrArray extends Array<string | AttrArray> {

}

interface RequestHeader extends Object {
    accessToken?: string
}

interface ResponseData extends Object {
    status?: number
}

//  预设默认参数
const useDefaultParam = (...defaultParams: any[]) => {
    return (target: any, propName: string, descriptor: PropertyDescriptor) => {
        const method = descriptor.value;

        descriptor.value = function (...realParams: any[]) {
            return method.call(this, ...(defaultParams.length > realParams.length ? defaultParams : realParams).map((item, index) => {
                let def = defaultParams[index]
                    , real = realParams[index]
                ;

                if (def?.constructor === Object && real?.constructor === Object) {
                    Object.keys(def).forEach(key => {
                        real[key] = real[key] ?? def[key];
                    });
                }

                return real ?? def;
            }));
        };
    }
};

/**
 * 适配装饰器
 * @param adapter {function} 适配器
 */
const useAdapter = (adapter: (result2: any) => any) => {
    return (target: any, propName: string, descriptor: PropertyDescriptor) => {
        const method = descriptor.value;

        descriptor.value = function (...params: any[]) {
            return method.call(this, ...params).then(adapter);
        };
    }
};

function Provider(target: any) {
    const callback = target.value;

    target.value = function () {
        callback.call(this);
    }
}

/**
 * 业务接口服务封装
 */
@Provider
class BaseProvider implements IFProvider {

    HOST: string
    HOST_API: string

    constructor(options?: BaseProviderOptions) {
        this.HOST = options?.HOST ?? "";
        this.HOST_API = options?.HOST_API ?? this.HOST;
    }

    /**
     * 缓存装饰器
     * @param storeName {string} 存储名称（默认使用类名+方法名）
     * @param saveTime {number} 存储有效期，毫秒为单位
     */
    static useCache(storeName?: string, saveTime = initConfig.validityTime) {
        return function (target: any, propName: string, descriptor: PropertyDescriptor) {
            const method = descriptor.value;

            descriptor.value = function (...params: any[]) {
                const realStoreName = storeName ?? (target.name || target.constructor.name) + "." + propName;

                return BaseProvider.getData(realStoreName).then(res => res?.time && res.time > +new Date() ? res.data : Promise.reject("数据已过期")).catch(err => method.call(this, ...params).then((data: any) => BaseProvider.saveData(realStoreName, {
                    time: saveTime ? +new Date() + saveTime : "",
                    data: data
                }).then(e => data)));
            };
        }
    }

    static getData(storeName: string): Promise<any> {

        return Uni.storage(storeName).then(strData => {
            if (strData) {
                let storeValue: string | StoreValue = "";

                try {
                    storeValue = JSON.parse(strData) as StoreValue;
                } catch (err) {

                }
                return storeValue ? Promise.resolve((storeValue as StoreValue).data) : Promise.reject("");
            } else {
                return Promise.reject("No data");
            }
        });

    }

    static saveData(storeName: string, data: StoreValue["data"]): Promise<any> {
        try {
            Uni.storage(storeName, JSON.stringify(data));
        } catch (e) {
            (new Logger()).output("存储数据出错:" + JSON.stringify(e));

            return Promise.reject(e);
        }

        return Promise.resolve();
    }

    /**
     * 转化网址（缺少域名时添加）
     * @param url (String) 需要转化的地址
     * @return url (String) 转化后的地址
     */
    convertUrl(url: string): string {
        if (/^\//.test(url)) {
            url = this.HOST + url;
        }
        return url;
    }

    /**
     * 在数据集中转化网址
     * @param data {Object|Array} 数据集
     * @param attrs {Array|String} 要检查的属性名
     * @return {Object|Array} 返回的数据集
     */
    convertDataUrl(data: ConvertArray | ConvertObject, attrs: AttrArray | string = ['src', 'url']): typeof data {
        if (!attrs) {
            throw new Error("没有设置需要转换的字段");
        }
        if (typeof attrs === "string") {
            attrs = [attrs as string];
        }
        if (data instanceof Array && data.length) {
            data = data.map(item => this.convertDataUrl(item, attrs));
        } else if (typeof data === 'object') {
            (attrs as AttrArray).forEach(attr => {
                if (attr instanceof Array && attr.length) {
                    const firstAttr = attr[0] as string;

                    (data as ConvertObject)[firstAttr] && ((data as ConvertObject)[firstAttr] = this.convertDataUrl((data as ConvertObject)[firstAttr], attr.slice(1)));
                } else if ((data as ConvertObject)[attr as string]) {
                    (data as ConvertObject)[attr as string] = this.convertUrl((data as ConvertObject)[attr as string]);
                }
            });
        }

        return data;
    }

    /**
     * 通用接口封装加密（业务，异步版本）
     * @param {String} apiName 接口名称
     * @param {object} data 请求参数/数据
     * @param {String} method 请求类型
     * @param {String} dataType 响应数据格式
     * @param {object} pathParam 路由参数
     * @param {object} header 请求头部信息
     * @return {Promise} 是否成功
     */
    request(apiName: string, data = {}, method = "POST", dataType = "json", pathParam = {}, header: RequestHeader = {}) {
        return Uni.request({
            header,
            method: method as any,
            url: this.getApiUrl(apiName),
            dataType,
            data
        });
    }

    /**
     * 查询接口路径
     * @param apiName {String} 接口名称
     * @return {string} 接口路径
     */
    getApiUrl(apiName: string) {
        if (apiName) {
            return /^http[s]?:\/\//.test(apiName) ? apiName : this.HOST_API + apiName;
        } else {
            (new Logger()).output("找不到名称对应的接口路径");
        }

        return "";
    }

}

export {BaseProvider, BaseProviderOptions, useDefaultParam, useAdapter};