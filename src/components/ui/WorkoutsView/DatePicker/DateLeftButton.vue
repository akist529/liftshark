<template>
<button
    title="Last Month"
    class="DateLeftButton"
    @click="workoutStore.changeDateBack"
></button>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
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
.DateLeftButton {
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
        background-image: url('/public/images/icons/chevron_left.svg');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        width: 32px;
        height: 32px;
        content: '';
    }
}
</style>
