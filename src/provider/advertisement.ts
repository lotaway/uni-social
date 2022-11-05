import initConfig from '../config/init_config';
import RouterController from "../controller/router";
import {BaseProvider} from "./base";
import Logger from "../utils/logger";

namespace nsAdvertisement {

	export interface CategoryAdParam {
		
	}

    export interface CategoryAdResponse {

    }

}

class Adapter {

    static getCategoryAd() {

    }

}

/**
 * 广告图接口
 */
class Advertisement extends BaseProvider {

    constructor(options: any) {
		super({
			HOST: initConfig.ENVIRONMENT === "pro" ? initConfig.HOST_PRO : initConfig.HOST_DEV,
			...options
		});
    }

    /**
     * 获取分类广告图
     * @param {Object} params 参数
     * @return {Promise} 是否成功
     */
    @Logger.detail()
    @BaseProvider.defaultParams({
        duoge: 0    //  是否多个 (0,不是;1是;默认不是)
    })
    @BaseProvider.useAdapter(Adapter.getCategoryAd)
    getCategoryAd(params: nsAdvertisement.CategoryAdParam) {
        return this.request(RouterController.API.getCategoryAd, params) as Promise<nsAdvertisement.CategoryAdResponse>;
    }
}

const ProviderAdvertisement = Advertisement;

export {ProviderAdvertisement, nsAdvertisement};