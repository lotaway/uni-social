//  @@router("路由控制器")
import Uni, {Router, SwitchTab} from "../utils/uni";

export type View = {}

@Router("main-id")
export default class RouterController {

    constructor() {

    }

    @SwitchTab()
    public switchTab(path: string) {
        return path;
    }

    public navigateTo(path: string) {
        return path;
    }
}