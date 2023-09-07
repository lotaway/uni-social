<template lang="pug">
view.container.u-flex.u-col-top.u-row-between(:class="props.direction")
    slot.header(name="header")
    slot.main(name="main")
    slot.footer(name="footer")
</template>
<style scoped lang="sass">
.container
    flex-direction: row
    &.col
        flex-direction: column
</style>
<script lang="ts" setup>
    interface Props {
        direction?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        direction: ""
    });
</script>

<script lang="ts">
export default {
    name: "Container"
}
</script>