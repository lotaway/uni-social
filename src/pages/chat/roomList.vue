<template lang="pug">
Container.container
	template(v-slot:header)
		.affix
			.row.nav-warpper
				.main-title(:span="12")
					button(link,@tap="toggleRoomFilterView(true)")
						text.text.bold {{$t("globalName")}}
						.icon
							.icon-arrow-down
				.col.fast-tool(:span="12")
					.row
						.col(:span="8")
							button.fast-tool-btn(@tap="handleFastTool(0)")
								.icon-plus
		.room-filter
			u-action-sheet(:list="$store.state.room.roomTypeList",v-model="isShowRoomFilter")
			.drawer
				.title {{$t('roomList.roomType')}}
				.default
					.row.room-type-item
						.col(:span='8',v-for="typ in $store.state.room.roomTypeList")
							button(@tap="selectFilteType(typ.value)",:class="tempSelectedType === typ.value ? ' bg-brand-color' : ' bg-dark-fill'") {{typ.name}}
				.footer
					button(type="primary",circle,@tap="confirmFilter") {{$t("confirm")}}
	template(v-slot:main)
		view.content
			navigator.link(@tap="showSignInView('user')") {{$t("signInTip")}}
			swiper.ad-container(circular,autoplay="true",indicator-dots="true",:indicator-active-color="$store.state.mainColor")
				swiper-item.ad-item(v-for="(i, adIndex) in $store.state.ad.list",:key="i.image",@tap="adEvent(adIndex)")
					navigator.ad-link
						image.ad-image(:src="i.image",mode="widthFix")
			view.room-list
				view.room-item(v-for="r in $store.state.room.list",@tap="showRoomById(r.id)")
					text.room-title {{r.title}}
			.empty.status(v-show="$store.state.room.list.length === 0 && $store.getters['room/isEnd']") {{$t("roomList.isEmpty")}}
	template.footer(v-slot:footer,v-show="false") {{$t("pageBottomTip")}}
</template>
<style lang="sass">
	@use "../../static/style/record"
	
	.container
		max-width: 100%
		.main
			padding: 10rpx
		.ad-container
			border-radius: 40rpx
			overflow: hidden
			.ad-item
				line-height: 300rpx
				.ad-link,
				.ad-image
					display: block
					width: 750rpx
</style>
<script lang="ts" setup>
	import {ref, onMounted, getCurrentInstance} from "vue";
	import {useStore} from "vuex";
	import {useI18n} from "vue-i18n";
	import Uni from "../../utils/uni";
	import RouterController from "../../controller/router";
	
	const store = useStore(),
		{t} = useI18n()
		;

	// const mainColor = ref("#151515");
	// Uni.showToast(mainColor.value);
	const ins = getCurrentInstance();	//	use to get data in setup
	
	onMounted(() => {
		ins?.data.isLoading !== true && store.state.room.list.length === 0 && store.dispatch("room/getNextPage");
	});
	
</script>
<script lang="ts">
import Container from "../../components/Container.vue";
import initConfig from "../../config/init_config";

export default {
	components: {
		Container
	},
	data() {
		return {
			isLoading: false,
			isShowRoomFilter: false,
			tempSelectedType: 0,
			newAdd: {
				icon: "Plus",
				value: 3,
				list: [
					{
						icon: "AddUser"
					}
				]
			}
		};
	},
	computed: {
		fastToolList() {
			return [];
		}
	},
	methods: {
		toggleRoomFilterView(isShow?: boolean) {
			this.isShowRoomFilter = isShow ?? !this.isShowRoomFilter;
		},
		selectFilteType(type: number) {
			this.tempSelectedType = type;
		},
		confirmFilter() {
			this.toggleRoomFilterView(false);
			this.$store.commit({
				type: "room/resetRoomList"
			});
			this.$store.dispatch("room/getNextPage", {
				type: this.tempSelectedType
			});
		},
		adEvent(adIndex: number) {
			Uni.switchTab("/pages/chat/chatList");
		},
		showSignInView(type: string = "user") {
			Uni.navigateTo("/pages/user/signIn", {
				query: {
					type
				}
			});
		},
		showRoomById() {
			this.showSignInView();
		},
		handleScrollToBottom() {
			console.log("handleScrollToBottom");
		}
	}
}
</script>