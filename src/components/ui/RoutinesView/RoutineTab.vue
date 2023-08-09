<template>
<v-tab :value="index">
    <i
        class="icon"
        :style="{backgroundImage: `url(/images/icons/${day.toLowerCase()}.webp)`}"
    ></i>
    <span>{{ day }}</span>
</v-tab>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        day: {
            type: String as PropType<string>,
            required: true
        },
        index: {
            type: Number as PropType<number>,
            required: true
        }
    }
})
</script>

<style scoped lang="scss">
.icon {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    content: '';
    width: 32px;
    height: 32px;
    display: inline-block;
    filter: invert(1);
    margin-right: 16px;
}
</style>
