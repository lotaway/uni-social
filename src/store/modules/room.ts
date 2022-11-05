import {Module, VuexModule, Mutation, Action, MutationAction} from "vuex-module-decorators";
import ProviderChat from "../../provider/chat";

const providerChat = new ProviderChat();

type Rooms = Array<{
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
    people: Array<{
        avatar: string
        tags: Array<string>
    }>
}>

@Module({
    namespaced: true
})
export default class Room extends VuexModule {

    filter = {
        type: {
            list: [
                {
                    name: "一起看",
                    value: 1
                },
                {
                    name: "一起聊",
                    value: 2
                },
                {
                    name: "听歌K歌",
                    value: 3
                },
                {
                    name: "一起玩",
                    value: 4
                }
            ]
        }
    };
    list: Rooms = [];
    pageNumber = 0;
    pageTotal = Infinity;
    currentId = 0;

    get isEnd() {
        return this.pageNumber === this.pageTotal;
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