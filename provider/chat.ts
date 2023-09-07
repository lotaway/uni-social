import {BaseProvider, BaseProviderOptions, useDefaultParam, useAdapter} from "./base";

namespace NSChat {

    interface RoomListParams extends Object {
        pageNumber?: number
    }

    export class Provider extends BaseProvider {

        constructor(params?: BaseProviderOptions) {
            super(params);
        }

        @useDefaultParam({
            pageNumber: 1
        })
        getRoomByPageIndex(options: RoomListParams) {
            return Promise.resolve({
                list: [{
                    id: 1,
                    title: "test1"
                },{
                    id: 2,
                    title: "test2"
                }]
            });
        }

    }

}

export default NSChat;