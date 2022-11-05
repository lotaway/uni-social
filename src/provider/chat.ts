import {BaseProvider, BaseProviderOptions} from "./base";

interface RoomListParams extends Object {
    pageNumber?: number
}

class Chat extends BaseProvider {

    constructor(params?: BaseProviderOptions) {
        super(params);
    }

    @BaseProvider.defaultParams({
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

export default Chat;