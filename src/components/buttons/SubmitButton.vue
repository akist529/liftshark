<template>
    <button>
        <img alt="Use Routine" :src="assetspath('./ui/add_circle.webp')" />
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
        border: none;
        background: none;
        cursor: pointer;
    }
</style>
