import path from "path";
import { defineConfig } from "vite";
import uniPlugin from "@dcloudio/vite-plugin-uni";
// import AutoImport from 'unplugin-auto-import/vite';
// import ElementPlus from 'unplugin-element-plus/vite';
// import Components from 'unplugin-vue-components/vite';
// import Icons from 'unplugin-icons/vite';
// import IconsResolver from 'unplugin-icons/resolver';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
const pathSrc = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
	// const {VITE_PUBLIC_PATH} = loadEnv(mode, process.cwd());

	return {
		// base: VITE_PUBLIC_PATH,	//	打包路径
		resolve: {
		    alias: {
		      '@': pathSrc,
		    },
		  },
		plugins: [
			uniPlugin(),
			// AutoImport({
			//       resolvers: [
			// 		// 	自动导入组件
			//         ElementPlusResolver(),
			// 		// 	自动导入图标
			//         IconsResolver({
			//           prefix: 'Icon',
			//         })
			//       ],
			//       dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
			//     }),
			// ElementPlus({
		    //     importStyle: 'sass',
		    //     useSource: true,
			// 	enforce: "pre"
		    // }),
		    // Components({
		    //     resolvers: [
			// 		// 	自动注册组件
			// 		ElementPlusResolver(),
			// 		// 	自动注册图标
			// 		IconsResolver({
			// 		    enabledCollections: ['ep'],
			// 		})
			// 	],
			// 	dts: path.resolve(pathSrc, 'components.d.ts')
		    // }),
			// Icons({
			//     autoInstall: true,
			// })
		],
	}
});