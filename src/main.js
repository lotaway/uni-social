import { createSSRApp } from "vue";
import { createI18n } from "vue-i18n";
import infiniteScroll from "vue-infinite-scroll";
import store from "./store";
import messages from "./locale";
// 	全局引入ElementUI，可换成手动引入或者自动按需引入
// import ElementPlus from 'element-plus';
// import {ElContainer, ElHeader, ElFooter, ElMain, ElRow, ElCol} from "element-plus";
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// import 'element-plus/dist/index.css';
import uView from "vk-uview-ui";
import App from "./App.vue";
import Uni from "./utils/uni";

const uniLocale = Uni.getLocale(),
    locale = uniLocale || navigator.language || navigator.browserLanguage || "en", //  默认语言
    i18n = createI18n({
        silentFallbackWarn: false,
        fallbackWarn: false,
        legacy: false,
        globalInjection: true,  //  全局注入，才能在App和小程序里让$t('name')语法生效，对H5没影响
        locale,
        messages
    });

uniLocale !== locale && Uni.setLocale(locale);

export function createApp() {
    const app = createSSRApp(App);
    // const ElementPlus = {install: function (Vue) {
    //     Vue.use(ElContainer);
    // }};

    app.use(i18n);
    app.use(store);
    // app.use(ElementPlus, {
        // locale
        // i18n: (key, value) => i18n.t(key, value)
    // });
    // for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    //     app.component(`el-icon-${key}`, component);
    // }
    app.use(infiniteScroll);
    app.use(uView);
    //  全局过滤器
    app.config.globalProperties.$filters = {};
    // uni.$u.setConfig({
    //     // 修改$u.config对象的属性
    //     config: {
    //         // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
    //         unit: 'rpx'
    //     },
    //     // 修改$u.props对象的属性
    //     props: {
    //         // 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
    //         radio: {
    //             size: 15
    //         }
    //         // 其他组件属性配置
    //         // ......
    //     }
    // })

    return {
        app
    };
}