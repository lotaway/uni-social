// 页面配置
const prevFix = "/pages/"
	, PAGE_NAME = {
        HOME: "home"
    }
;

interface IF_PAGE_OBJ_ITEM extends Object {
    NAME?: string
    SERVER?: string
    CLIENT?: string
    DEFAULT_PARAM?: object
    DEFAULT_QUERY?: object
    REG_EXP?: object
}

interface IF_PAGE_OBJ extends Object {
    [key: string]: IF_PAGE_OBJ_ITEM
}

let PAGE_OBJ: IF_PAGE_OBJ = {
    //  应用首页
    HOME: {
        NAME: PAGE_NAME.HOME
        , CLIENT: prevFix + "/home"
    }
};

export {PAGE_NAME, PAGE_OBJ, IF_PAGE_OBJ, IF_PAGE_OBJ_ITEM};