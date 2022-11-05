import {createStore, Module} from "vuex";
import initConfig from "../config/init_config";
import room from "./modules/room";
import user from "./modules/user";
// 这种方式很好的将modules中的所有文件全部导出，这样以后修改modules不用再在此处进行添加导出
// const modulesFiles: Record<string, { default: Module<string, any> }> = import.meta.glob("./modules/*.[ts,js]", {
//     eager: true
// });
// let modules = [];
// Object.keys(modulesFiles).forEach(path => {
//     modules[path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')] = modulesFiles[path]?.default;
// });

export default createStore({
    state: {
        mainColor: initConfig.mainColor,
        ad: {
            list: [
                {
                    link: "",
                    image: "/static/image/ad-1.jpg"
                },
                {
                    link: "",
                    image: "/static/image/ad-2.jpg"
                }
            ]
        }
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        room,
        user
        // ...modules
    }
});