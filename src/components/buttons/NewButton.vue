<template>
    <div>
        <button type="button" @click="$emit('clicked')">
            <img alt="Add New Routine" :src="assetspath('./ui/add.webp')" />
            <slot></slot>
        </button>
    </div>
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
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 5px 10px;

    img {
        width: 20px;
        margin-right: 50px;
    }
}
</style>
