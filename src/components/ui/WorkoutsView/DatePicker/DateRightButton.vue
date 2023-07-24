<template>
<button
    title="Next Month"
    class="DateRightButton"
    @click="workoutStore.changeDateForward"
></button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useWorkoutStore } from '@/stores/workoutStore';

export default defineComponent({
    data () {
        const workoutStore = useWorkoutStore();

        return ({
            workoutStore
        });
    }
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
