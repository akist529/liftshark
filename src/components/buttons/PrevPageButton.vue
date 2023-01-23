<template>
    <button>
        <img alt="Back" :src="assetspath('./ui/exercises/arrow_left.webp')" />
        <span>Back</span>
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
    background-color: rgb(66, 103, 178);
    color: white;
    padding: 5px 5px;
    font-size: 1.25rem;

    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
