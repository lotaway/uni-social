<template lang="pug">
text(class="text",@tap="adEvent") {{$t("globalName")}}
</template>
<script lang="ts" setup>

</script>
<script lang="ts">
	export default {
		methods: {
			adEvent() {
        		console.log("adEvent");
			}
		}
	}
</script>