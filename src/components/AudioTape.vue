<template lang="pug">
view.audio(:src="props.audio",@tap="play") Show a sound tape bar, tap to play recorded sound;
</template>
<script lang="ts" setup>
interface Props {
    audio: string
    length?: number
}

const props = withDefaults(defineProps<Props>(), {
        audio: "",
        length: 0
    })
    , emits = defineEmits(["play", "pause", "stop"])
;
</script>
<script lang="ts">
    import Uni from "../utils/uni";
    
    export default {
        name: "audioTape",
        data() {
            return {
                audioContext: Uni.createInnerAudioContext(),
                isPlaying: false
            };
        },
        methods: {
            play() {
                this.audioContext.src = props.audio;
                this.audioContext.play();
                emits("play", props.audio);
            },
            pause() {
                this.audioContext.pause();
                emits("pause", props.audio);
            },
            stop() {
                this.audioContext.stop();
                emits("stop", props.audio);
            }
        }
    };
</script>