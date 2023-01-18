<template>
    <button>
        <span>More</span>
        <img alt="More Exercises" :src="assetspath('./ui/exercises/arrow_right.svg')" />
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
    padding: 5px 10px;
}
</style>
