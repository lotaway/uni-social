<script setup lang="ts">
	import {
		onLaunch,
		onShow,
		onHide,
		onThemeChange,
		onShareAppMessage,
		onShareTimeline
	} from "@dcloudio/uni-app"
	// import Uni from "./utils/uni"
	
	class AppShareContent implements Page.CustomShareContent {
		static create() {
			return new AppShareContent()
		}
	}
	
	onLaunch(() => {
		// #ifdef H5
		// Uni.onTabBarMidButtonTap(event => {
			// Uni.navigateTo("pages/find/find");
		// });
		// #endif
	})
	onShow(() => {
		// console.log("App Show");
	})
	onHide(() => {
		// console.log("App Hide");
	})
	onThemeChange(options => {
		console.log('系统主题变化:' + options.theme)
	})
	onShareAppMessage(options => {
		if (options.webViewUrl) {

		}
		return AppShareContent.create()
	})
	onShareTimeline(() => ({
		title: "",
		query: "from=app",
		imageUrl: ""
	}))
</script>
<style lang="scss">
// @import '@/uni_modules/uni-scss'
@import "vk-uview-ui/index.scss";

.bold {
	font-weight: bold;
}
</style>
