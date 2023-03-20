<template>
    <button>
        <img alt="Use Routine" :src="assetspath('./ui/add_circle.webp')" />
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
        border: none;
        background: none;
        cursor: pointer;
    }
</style>
