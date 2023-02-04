<template>
    <button>
        <img alt="Bookmark" :src="assetspath('./ui/star.webp')" />
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
    background: none;
    border: none;
    cursor: pointer;

    img {
        filter: invert(0%);
        height: 60px;
    }
}
</style>
