import {Module, VuexModule, Mutation, Action, MutationAction} from "vuex-module-decorators";
import NSChat from "../../provider/chat";

const providerChat = new NSChat.Provider();

interface People {
    avatar: string
    tags: string[]
}

interface RoomInfo {
    id: number
    title: string
    startTime: Date
    owner: {
        nickname: string
        avatar: string
        sex: number
    }
    type: string
    background: string
    people: People[]
}

type Rooms = RoomInfo[]

enum RoomType {
    Look = 1,
    Chat = 2,
    Listen = 3,
    Play = 4
}

export interface States {
    filter: {
        roomTypeEnum: RoomType
    }
    list: Rooms
}

@Module({
    namespaced: true
})
export default class Room extends VuexModule<States> {

    filter = {
        roomTypeEnum: RoomType
    };
    list: Rooms = [];
    pageNumber = 0;
    pageTotal = Infinity;
    currentId = 0;

    get isEnd() {
        return this.pageNumber === this.pageTotal;
    }

    get roomTypeList() {
        return Object.values(this.filter.roomTypeEnum);
    }

    @Mutation
    updatePageNumber(list: Rooms) {
        this.pageNumber++;
        this.list.push(...list);
    }

    @Mutation
    resetRoomList() {
        this.list = [];
        this.pageNumber = 0;
    }

    @Action({
        commit: "updatePageNumber"
    })
    async getNextPage() {
        const result = await providerChat.getRoomByPageIndex({
            pageNumber: this.pageNumber + 1
        });

        return result.list;
    }

    @MutationAction({
        mutate: ["pageNumber", "list"]
    })
    async _getNextPage() {
        const pageNumber = this.pageNumber + 1,
            result = await providerChat.getRoomByPageIndex({
                pageNumber: pageNumber
            });

        return {
            pageNumber,
            list: result.list
        };
    }

}
