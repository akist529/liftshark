<template>
    <button>
        <img alt="More Exercises" :src="assetspath('./ui/double_arrow_right.webp')" />
    </button>
</template>

<script lang="ts">
// Import global APIs & libraries
import { defineComponent } from 'vue'
// Import mixins
import { fetchImages } from '@/mixins/fetchImages'

export default defineComponent({
  mixins: [fetchImages]
})
</script>

<style scoped lang="scss">
button {
    background-color: var(--button-bg-color);
    padding: 8px 16px;
    border: none;
    border-radius: 10px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
