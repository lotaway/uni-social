<template lang="pug">
view.container
  text 当前电量为:{{batteryCapacity}}%,请注意电量使用情况
  text(class="text",@tap="adEvent") {{$t("globalName")}}
</template>
<script lang="ts" setup>
import {getBatteryCapacity} from "@/uni_modules/lotaway-getbatteryinfo"
import { onMounted, ref } from "vue"

function adEvent() {
  console.log("adEvent")
}

const batteryCapacity = ref(-1)

onMounted(() => {
	batteryCapacity.value = getBatteryCapacity().level
})
</script>
