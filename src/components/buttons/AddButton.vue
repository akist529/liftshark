<template>
<button class="AddButton" type="button" @click="$emit('clicked')">
    <div class="icons">
        <span :style="{ backgroundImage: `url(images/icons/${itemAdded}.svg)` }"></span>
    </div>
    <slot></slot>
</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchImages } from '@/mixins/fetchImages';

export default defineComponent({
    mixins: [fetchImages],
    props: ['itemAdded']
});
</script>

<style scoped lang="scss">
.AddButton {
    /* Positioning */
    display: grid;
        grid-template-columns: auto 1fr;
        justify-items: flex-end;
        align-items: center;

    /* Visual */
    width: 200px;
    padding: 5px 10px;
    cursor: pointer;

    .icons {
        display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;

        span,
        &::after {
            content: '';
            width: 32px;
            height: 32px;
            background-size: contain;
            background-repeat: no-repeat;
        }

        &::after {
            background-image: url('/public/images/icons/add.svg');
        }
    }
}
</style>
