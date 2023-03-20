<template>
    <button>
        <img alt="Close" :src="assetspath('./ui/close.webp')" />
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
    position: absolute;
    right: 15px;
    top: 15px;
    width: 25px;
    height: 25px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: none;
    border: none;
    cursor: pointer;

    img {
        width: 80%;
        height: 80%;
    }
}
</style>
