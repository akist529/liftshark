<template>
<button class="AddButton" type="button" @click="$emit('clicked')">
    <div>
        <img
            :alt="itemAdded"
            :src="`/public/images/icons/${itemAdded}.svg`" />
        <img
            alt="Add"
            src='/public/images/icons/add.svg' />
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
.AddRoutineButton {
    /* Positioning */
    display: grid;
        grid-template-columns: auto 1fr;
        justify-items: flex-end;
        align-items: center;

    /* Visual */
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
