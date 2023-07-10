<template>
<button>
    <img
        alt="More Exercises"
        :src="assetspath('./ui/double_arrow_right.webp')" />
</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchImages } from '@/mixins/fetchImages';

export default defineComponent({
    mixins: [fetchImages]
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
    padding: 8px 16px;
    border: none;
        border-radius: 10px;
    cursor: pointer;

    img {
        filter: invert(1);
    }
}
</style>
