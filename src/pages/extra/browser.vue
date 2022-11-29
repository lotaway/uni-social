<template lang="pug">
web-view.web-view(:src="props.url")
</template>
<style lang="sass">
    .web-view
        // overflow: hidden
</style>
<script lang="ts" setup>
import {onMounted} from "vue";

onMounted(() => {

});
</script>
<script lang="ts">

//  in the webview url page
// document.addEventListener('UniAppJSBridgeReady', function() {
//     uni.postMessage({
//         data: {
//             action: 'message'
//         }
//     });
// });

export default {
    data() {
        return {
            url: ""
        };
    },
    onLoad(options: any) {
        this.url = options.url;
    }
};
</script>