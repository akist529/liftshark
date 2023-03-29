<template>
    <button>
        <img alt="Close" title="Close" :src="assetspath('./ui/close.webp')" />
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
    right: 5px;
    top: 5px;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;

    background: none;
    border: none;
    cursor: pointer;

    img {
        width: 20px;
        height: 20px;
    }

    &:hover {
        background: rgba(0,0,0,0.1);
    }
}
</style>
