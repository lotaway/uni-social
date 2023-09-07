<template>
	<view>用户中心</view>
</template>
<script lang="ts" setup>
import {useI18n} from "vue-i18n";

const {locale} = useI18n(),
    changeLanguage = (lang: string) => {
      locale.value = lang;
    }
;
</script>
<script lang="ts">
import Uni from "../../utils/uni";

export default {
  methods: {
    uploadAvatar(files: File | File[]) {
      Uni.uploadImage("", files as File[]).then(res => {
        console.log(res);
      });
    }
  }
}
</script>