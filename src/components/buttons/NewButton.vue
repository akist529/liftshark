<template>
    <button type="button" @click="$emit('clicked')">
        <div>
            <img :alt="itemAdded" :src="assetspath(`./ui/${itemAdded}.svg`)" />
            <img alt="Add" :src="assetspath('./ui/add.webp')" />
        </div>
        <slot></slot>
    </button>
</template>

<script lang="ts">
// Import global APIs & libraries
import { defineComponent } from 'vue'
// Import mixins
import { fetchImages } from '@/mixins/fetchImages'

export default defineComponent({
  mixins: [fetchImages],
  props: ['itemAdded']
})
</script>

<style scoped lang="scss">
button {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-items: flex-end;
    align-items: center;

    width: 200px;
    padding: 5px 10px;

    div {
        display: flex;
        gap: 5px;

        img {
            height: 20px;
        }
    }
}
</style>
