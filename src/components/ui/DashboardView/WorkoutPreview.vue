<template>
<div v-if="workout" class="WorkoutPreview">
    <h3>{{ routine?.attributes.name }}</h3>
    <ul v-if="routine?.attributes.exercises && routine?.attributes.exercises.length > 0" class="exercise-list">
        <li v-for="exercise in routine?.attributes.exercises" :key="exercise.id">
            <h4>{{ exercise.name }}</h4>
            <ul v-if="exercise.sets.length > 0" class="set-list">
                <li v-for="set in exercise.sets" :key="set.id">
                    <span>{{ set.reps }} reps</span>
                    <span>{{ set.weight }} lbs.</span>
                </li>
            </ul>
        </li>
    </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Workout } from '@/types/index';
import { useRoutineStore } from '@/stores/routineStore';

export default defineComponent({
    data () {
        const routineStore = useRoutineStore();

        return ({
            routineStore
        });
    },
    props: {
        workout: Object as PropType<Workout>
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
