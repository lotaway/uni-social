import initConfig from '../config/init_config';
import RouterController from "../controller/router";
import {BaseProvider, useDefaultParam, useAdapter} from "./base";
import Logger from "../utils/logger";

/**
 * 广告接口
 */
namespace Advertisement {

    export enum Multiply {
        No,
        Yes
    }

	export interface CategoryAdParam {
		multiply?: Multiply     //  是否多个
	}

    export interface CategoryAdResponse {

    }

    class Adapter {

        static getCategoryAd() {

        }

    }

    export class Provider extends BaseProvider {

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
        @useDefaultParam({
            multiply: Multiply.No
        })
        @useAdapter(Adapter.getCategoryAd)
        getCategoryAd(params: CategoryAdParam) {
            return this.request(RouterController.API.getCategoryAd, params) as Promise<Advertisement.CategoryAdResponse>;
        }
    }

}

export default Advertisement;