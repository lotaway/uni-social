<template>
    用户中心
</template>
<script lang="ts" setup>
    import {useI18n} from "vue-i18n";

    const {locale} = useI18n(),
        changeLanguage = (lang: string) => {
            locale.value = lang;
        }
        ;
</script>