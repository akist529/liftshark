<template>
<button title="Next Month" class="DateRightButton" @click="$emit('changeDateForward')"></button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchImages } from '../../../../mixins/fetchImages';

export default defineComponent({
    mixins: [fetchImages]
});
</script>

<style scoped lang="scss">
.DateRightButton {
    /* Positioning */
    display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;

    /* Visual */
    background: none;
    border: none;
    cursor: pointer;

    &::after {
        background-image: url('/public/images/icons/chevron_right.svg');
        background-size: contain;
        background-repeat: no-repeat;
        width: 32px;
        height: 32px;
        content: '';
    }
}
</style>
