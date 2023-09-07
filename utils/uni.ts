import "reflect-metadata";

namespace UniType {
    export type NavigateOptions = {
        query: {
            [key: string]: any
        }
    }
    export type EventName = string
    export type EventCallBack = (result: any) => void
}
export const ROUTER_METADATA = 'routerController';
export const Router = (id: string): ClassDecorator => {
    return (target: any) => {
        Reflect.defineMetadata(ROUTER_METADATA, id, target);
    }
}
export const SwitchTab = function (): MethodDecorator {
    return (target, propName, descriptor: PropertyDescriptor) => {
        const method = descriptor.value;
        descriptor.value = function (...params: any) {
            return method.call(this, ...params);
        };
    }
}
export const Uni = {
    ...uni,
    $on(eventName: UniType.EventName, callback: UniType.EventCallBack) {
        return uni.$on(eventName, callback);
    },
    $once(eventName: UniType.EventName, callback: UniType.EventCallBack) {
        return uni.$once(eventName, callback);
    },
    $emit(eventName: UniType.EventName) {
        return uni.$emit(eventName);
    },
    $off(eventName?: UniType.EventName | UniType.EventName[] | undefined, callback?: UniType.EventCallBack | undefined) {
        return uni.$off(eventName, callback);
    },
    createInnerAudioContext() {
        return uni.createInnerAudioContext();
    },
    // 	获取语言
    getLocale() {
        return uni.getLocale();
    },
    // 	设置语言
    setLocale(locale: string) {
        return uni.setLocale(locale);
    },
    // 切换选项卡页面
    switchTab(url: string, complete = (result: any) => {
    }) {
        return new Promise((success, fail) => {
            uni.switchTab({
                url,
                success,
                fail,
                complete
            });
        });
    },
    /**
     * 重定向当前页
     * @param {string} url 路径
     * @param {object=} options 更多选项
     * @returns
     */
    redirectTo(url: string, options?: UniType.NavigateOptions) {
        url = url + Object.keys(options?.query ?? {}).reduce((prev, key) => `${prev}&${key}=${options?.query[key]}`, "").replace(/^&/, "?");

        return new Promise((success, fail) => {
            uni.redirectTo({
                url,
                success,
                fail
            });
        });
    },
    /**
     * 导航到下一页
     * @param {string} url 路径
     * @param {object=} options 更多选项
     * @returns
     */
    navigateTo(url: string, options?: UniType.NavigateOptions) {
        url = url + Object.keys(options?.query ?? {}).reduce((prev, key) => `${prev}&${key}=${options?.query[key]}`, "").replace(/^&/, "?");

        return new Promise((success, fail) => {
            uni.navigateTo({
                url,
                success,
                fail
            });
        });
    },
    /**
     * 预加载页面
     * @param {string} url 路径
     * @param {Function=} complete 完成后的回调
     * @returns
     */
    preloadPage(url: string, complete = () => {
    }) {
        return new Promise((success, fail) => {
            uni.preloadPage({
                url,
                success,
                fail,
                complete
            });
        });
    },
    request(options: UniNamespace.RequestOptions) {
        return new Promise((success, fail) => {
            uni.request({
                url: options.url,
                data: options.data ?? "",
                dataType: options.dataType,
                method: options.method,
                success,
                fail
            });
        });
    },
    showToast(title: string) {
        return uni.showToast({
            title
        });
    },
    /**
     * 处理本地存储（异步）
     * @params {string} key 键名
     * @params {string=} data 键值
     * @returns {Promise<any>} 根据实际操作返回结果
     */
    storage(key: string, data?: string): Promise<any> {
        return new Promise((success, fail) => {
            if (data === "") {
                uni.removeStorage({
                    key,
                    success,
                    fail
                });
            } else if (data) {
                uni.setStorage({
                    key,
                    data,
                    success,
                    fail
                });
            } else {
                uni.getStorage({
                    key,
                    success,
                    fail
                });
            }
        });
    },
    /**
     * 处理本地存储（同步）
     * @params {string} key 键名
     * @params {string} data 键值
     * @returns 根据实际操作返回结果
     */
    storageSync(key: string, data?: string) {
        if (data === "") {
            return uni.removeStorageSync(key);
        } else if (data) {
            return uni.setStorageSync(key, data);
        } else {
            return uni.getStorageSync(key);
        }
    },
    /**
     * 上传文件
     * @param options {object} 上传文件选项
     */
    async uploadFile(options: UniNamespace.UploadFileOption) {
        return await new Promise((success, fail) => {
            uni.uploadFile({
                url: options.url,
                fileType: options.fileType,
                files: options.files,
                filePath: options.filePath,
                formData: options.formData,
                name: options.name || "file",
                success,
                fail
            });
        });
    },
    /**
     * 上传图片
     * @param {string} url 上传地址
     * @param {Array<UploadFileOptionFiles>} files 上传的文件
     */
    async uploadImage(url: string, files: Array<UniNamespace.UploadFileOptionFiles>) {
        return await Uni.uploadFile({
            url,
            fileType: "image",
            files,
            name: "image"
        });
    }
}

export default Uni;