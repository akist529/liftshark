<template>
    <button>
        <img alt="Back" :src="assetspath('./ui/double_arrow_left.webp')" />
        <span>BACK</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fetchImages } from '@/mixins/fetchImages'

export default defineComponent({
  mixins: [fetchImages]
})
</script>

<style scoped lang="scss">
button {
    background-color: var(--button-bg-color);
    color: white;
    padding: 4px 8px;
    font-size: 1.25rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
