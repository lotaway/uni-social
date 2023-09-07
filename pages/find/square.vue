<template lang="pug">
el-container.container
    audio-tape(audio="",@play="play",@pause="pause",@stop="stop") 这就是
</template>
<script lang="ts">
    import AudioTape from "@/components/AudioTape.vue"

    export default {
        components: {
            AudioTape
        },
        methods: {
            play() {

            },
            pause() {

            },
            stop() {
                
            }
        }
    };
</script>