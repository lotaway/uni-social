<template lang="pug">
base-container.container
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
			u-action-sheet(:list="$store.state.room.roomTypeList",v-model="filter.isShowRoomFilter")
			.drawer
				.title {{$t('roomList.roomType')}}
				.default
					.row.room-type-item
						.col(:span='8',v-for="typ in $store.state.room.roomTypeList")
							button(@tap="selectFilteType(typ.value)",:class="filter.tempSelectedType === typ.value ? ' bg-brand-color' : ' bg-dark-fill'") {{typ.name}}
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
import {ref, reactive, computed, onMounted, getCurrentInstance} from "vue";
import {useStore} from "vuex";
// import {useAppStore} from "../../store";
import {useI18n} from "vue-i18n";
import Uni from "@/utils/uni";

const store = useStore()
// const store = useAppStore()
const {t} = useI18n()

function showSignInView(type: string = "user") {
	Uni.navigateTo("/pages/user/signIn", {
		query: {
			type
		}
	})
}

// const mainColor = ref("#151515")
// Uni.showToast(mainColor.value)
const ins = getCurrentInstance()	//	use to get data in setup
const pageData = reactive({
	isLoading: false
})

onMounted(() => {
	// ins?.data.isLoading
	pageData.isLoading !== true && store.state.room.list.length === 0 && store.dispatch("room/getNextPage")
})

function handleScrollToBottom() {
	console.log("handleScrollToBottom")
}

const filter = reactive({
	isShowRoomFilter: false,
	tempSelectedType: 0,
})
const fastToolList = computed(() => [])

function toggleRoomFilterView(isShow?: boolean) {
	filter.isShowRoomFilter = isShow ?? !filter.isShowRoomFilter
}

function selectFilteType(type: number) {
	filter.tempSelectedType = type
}

function confirmFilter() {
	toggleRoomFilterView(false)
	store.commit({
		type: "room/resetRoomList"
	})
	store.dispatch("room/getNextPage", {
		type: filter.tempSelectedType
	})
}

function showRoomById() {
	showSignInView()
}

function adEvent(adIndex: number) {
	Uni.switchTab("/pages/chat/chatList")
}

const addRoom = reactive({
	icon: "Plus",
	value: 3,
	list: [
		{
			icon: "AddUser"
		}
	]
})

</script>
<script lang="ts">
	import BaseContainer from "@/components/Container.vue"
	export default {
		componets: {
			"base-container": BaseContainer
		}
	}
</script>