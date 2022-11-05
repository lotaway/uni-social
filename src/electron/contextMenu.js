module.exports = [{
    label: "编辑",
    submenu: [{
            label: "复制",
            role: "copy"
        },
        {
            label: "粘贴",
            role: "paste"
        },
        {
            label: "保存",
            click: () => {
                console.log("保存");
            }
        }
    ]
}];