<template>
<button class="BurgerMenuButton">
    <slot></slot>
    <span
        :style="{ 'background-image': image }"
    ></span>
</button>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        image: {
            type: Object as PropType<string>,
            required: true
        }
    }
});
</script>

<style scoped lang="scss">
.BurgerMenuButton {
    /* Positioning */
    display: flex;
        justify-content: center;
        align-items: center;

    /* Visual */
    background-color: var(--button-bg-color);
    color: white;
    padding: 5px;
    width: 35vw;
        min-width: 140px;
    cursor: pointer;
    border: none;
        border-radius: 10px;

    span {
        background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        width: 32px;
        height: 32px;
        content: '';
    }
}
</style>
