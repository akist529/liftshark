<template>
<div v-if="workout" class="WorkoutPreview">
    <h3>{{ workout.attributes.date }}</h3>
    <ul v-if="workout.attributes.entries && workout.attributes.entries.length > 0" class="exercise-list">
        <li v-for="entry in workout.attributes.entries" :key="entry.key">
            <h4>{{ entry.name }}</h4>
            <ul v-if="entry.sets.length > 0" class="set-list">
                <li v-for="set in entry.sets" :key="set.key">
                    <span>{{ set.reps }} reps</span>
                    <span>{{ set.weight }} lbs.</span>
                </li>
            </ul>
        </li>
    </ul>
</div>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Type interfaces
import { WorkoutData } from '@/types/index';
// Pinia stores
import { useRoutineStore } from '@/stores/routineStore';

export default defineComponent({
    data () {
        const routineStore = useRoutineStore();

        return ({
            routineStore
        });
    },
    props: {
        workout: {
            type: Object as PropType<WorkoutData>,
            required: true
        }
    },
    computed: {
        routine () {
            if (this.workout) {
                return this.routineStore.getRoutineById(this.workout.id);
            } else return null;
        }
    }
});
</script>

<style scoped lang="scss">
.WorkoutPreview {
    background-color: rgb(215, 215, 215);
    border: 3px solid rgb(175, 175, 175);
    padding: 10px;

    ul {
        list-style-type: none;
        display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
    }

    .exercise-list > li {
        background-color: rgb(175, 175, 175);
        padding: 10px;
        border: 3px solid rgb(150, 150, 150);
    }

    .set-list > li {
        display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
    }
}
</style>
