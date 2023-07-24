<template>
<th class="NextMonthButton">
    <button title="Next Month" @click="workoutStore.changeMonthForward">
        <span>{{ workoutStore.months[(workoutStore.selectedMonth + 12 + 1) % 12] }}</span>
    </button>
</th>
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
th button {
    /* Positioning */
    display: flex;
        justify-content: center;
        align-items: center;

    /* Visual */
    background: none;
    border: none;
    cursor: pointer;

    &::before {
        background-image: url('/public/images/icons/chevron_right.svg');
            background-size: contain;
            background-repeat: no-repeat;
        width: 32px;
        height: 32px;
        content: '';
    }
}
</style>
