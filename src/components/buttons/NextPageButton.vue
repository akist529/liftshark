<template>
    <button>
        <span>More</span>
        <img alt="More Exercises" :src="assetspath('./ui/exercises/arrow_right.webp')" />
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
