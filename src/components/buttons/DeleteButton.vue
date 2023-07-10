<template>
<button>
    <img
        alt="Delete"
        :src="assetspath('./ui/delete.svg')" />
</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchImages } from '@/mixins/fetchImages';

export default defineComponent({
    mixins: [fetchImages]
});
</script>

<style scoped lang="scss">
button {
    /* Positioning */
    display: flex;
        justify-content: center;
        align-items: center;
    position: absolute;
        right: 5px;
        top: 5px;

    /* Visual */
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
