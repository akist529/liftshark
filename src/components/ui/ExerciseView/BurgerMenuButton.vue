<template>
<button class="menu-btn">
    <slot></slot>
    <span :style="{ 'background-image': image }"></span>
</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ['image']
});
</script>

<style scoped lang="scss">
button {
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

    span {
        background-size: contain;
        background-repeat: no-repeat;
        width: 32px;
        height: 32px;
        content: '';
    }
}
</style>
