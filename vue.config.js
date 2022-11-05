module.exports = {
    publicPath: './dist', // 公共路径 如果放在服务器下的 admin 目录下 就配置 './admin'
    // outputDir: 'chain', // 打包后的目录名
    productionSourceMap: false, // 打包后不要sourcemap
    chainWebpack: config => {
        config.plugins.delete('prefetch')
        config.plugins.delete('preload');
    },
    css: {
        loaderOptions: {
            sass: {
                // prependData: `@import "@/assets/style/base.scss";`
            }
        }
    },
    devServer: {
        port: 3002,
        open: false,
        client: {
            overlay: {
                warnings: false,
                errors: true
            }
        },
        // https: true,
        // disableHostCheck: true,
        historyApiFallback: true,
        allowedHosts: "all",
        proxy: {
            '/api': {
                target: 'https://xxx.com',
                changeOrigin: true,
                ws: true,
                https: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    },
    // 上面的配置都是普通网页的配置， 这里只是顺便也贴了出来
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                publish: [{
                    provider: 'generic',
                    url: 'https://xxx.com/upload/app/' // 放置安装包和latest.yml的服务器地址
                }],
                asar: true,
                nsis: {
                    oneClick: false, // 是否一键安装
                    allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    allowToChangeInstallationDirectory: true, // 允许修改安装目录
                    // installerIcon: '', // 安装图标
                    // uninstallerIcon: '', //卸载图标
                    // installerHeaderIcon: '', // 安装时头部图标
                    // shortcutName: '', // 图标名称
                    createDesktopShortcut: true,
                    createStartMenuShortcut: true
                },
                win: {
                    icon: './public/favicon.ico', // 打包后的应用图标 public 目录下的图标  注意图标最小255 * 255，否则打包会报错
                    artifactName: 'app_${version}.${ext}', // 打包后的执行文件名称
                    // artifactName: 'chain-desktop_setup_${version}.${ext}', // 打包后的安装包名称
                    target: ['nsis', 'zip'] // 打包成安装包和免安装版
                },
                mac: {
                    icon: './public/app.jpg'
                },
                productName: 'uniapp-vue3-vuex-ts' // 应用名称
            }
        }
    }
}