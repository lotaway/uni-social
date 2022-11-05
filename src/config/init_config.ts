/**
 * APP内部通用配置
 * @description 根据不同客户进行配置、可更新
 * */
const initConfig = {
    ENVIRONMENT: "pro",  //  当前为发布环境，将会使用更新检测、启用已打包的本地页面
    // ENVIRONMENT: 'dev', //  当前为开发环境，将会停用更新检测，保持每次启动为第一次启动（引导图会总是显示）、本地页面将重定向到webpack开发服务器的路径上
    // DEBUG: false,    //  开关调试模式
    DEBUG: true,    //  开关调试模式（会在控制台输出，未完善）
    HOST_DEV: "http://192.168.44.229:10010",    //  开发域名，当ENVIRONMENT的值为dev时将使用此域名作为页面、接口的前缀
    HOST_PRO: "https://www.url.net",   // 发布域名，当ENVIRONMENT的值为pro时将使用此域名作为页面、接口的前缀
    MOCK: "",   // MOCK地址，模拟接口返回数据域名前缀，放空着不启用，仅在ENVIRONMENT的值为dev时才有效
    checkAppUpdateDelay: 24 * 60 * 60 * 1000,   //  检查更新间隔时间，单位毫秒（默认一天）
    BOOT_SHOW_TIME: 3000  //  启动广告图停留时间
    , GOODS_SALES_NUM: 8    //  猜你喜欢模块显示的商品数量
    , PAGE_NUM: 20         //  分页每页数量
    , RETRY_TIME: 3    //  部分必需的图片加载失败、接口返回出错信息时的重试次数
    , DOUBLE_CLICK_TIME: 300    //  双击时间（毫秒）
    //  选项卡页数据更新
    , VIEW_UPDATE: {
        MIN_DELAY: 1000 * 2,    //  最短更新间隔时间（毫秒）
        MAX_DELAY: 1000 * 5    //  最长更新间隔时间（毫秒）
    },
	validityTime: 1000,	//	接口数据有效时间
    //  推送消息
    pushMsgConfig: {
        DEF_TITLE: "推送消息"    //  默认标题
        , DEF_CONTENT: "您有一条未读消息" //  默认内容
    },
    language: "zh"  //  语言类型
    , mainColor: "#a4b8eb"  //  主颜色
	, statusBarBackground: "#f8434c"	//	状态栏背景颜色
    , ethProvider: "http://localhost:7545"  //  以太坊网络provider
};

export default initConfig;