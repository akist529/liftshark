<template>
<th class="CalendarDate">
    <span
        id="date"
    >{{ workoutStore.selectedDate }}</span>
    <hr/>
    <div>
        <span>{{ workoutStore.months[workoutStore.selectedMonth] }}</span>
        <span>{{ workoutStore.selectedYear }}</span>
    </div>
</th>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useWorkoutStore } from '../../../stores/workoutStore';

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
.CalendarDate {
    display: flex;
        gap: 10px;

    #date {
        font-size: 48px;
    }

    div {
        /* Positioning */
        display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

        /* Visual */
        font-size: 24px;
    }
}
</style>
