<template>
<div class="ExerciseForm">
    <header>
        <label for="exercise">Exercise:</label>
        <select :name="`exercise-${count}-name`">
            <option v-for="exercise in exercises"
                :value="exercise.name"
                :key="exercise.name"
            >{{ exercise.name }}</option>
        </select>
        <div class="set-count">
            <input
                :id="`exercise-${count}-setCount`"
                type="number"
                min="1"
                max="6"
                v-model="setCount"
            /><span> sets</span>
        </div>
        <DeleteButton
            @click="$emit('deleteExercise', $event)" />
    </header>
    <SetForm v-for="set in setCount"
        :key="set"
        :count="set" />
</div>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Type interfaces
import { Exercise } from '@/types/index';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
// Local components
import SetForm from '@/components/modals/WorkoutModal/SetForm.vue';
import DeleteButton from '@/components/buttons/DeleteButton.vue';

export default defineComponent({
    data () {
        const workoutStore = useWorkoutStore();
        const setCount = 1;

        return ({
            workoutStore,
            setCount
        });
    },
    props: {
        exercises: {
            type: Array as PropType<Exercise[]>,
            required: true
        },
        count: {
            type: Number as PropType<number>,
            required: true
        }
    },
    components: {
        SetForm,
        DeleteButton
    }
})
</script>

<style lang="scss">
.ExerciseForm {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;

    background-color: rgb(206, 206, 206);
	border: 2px solid rgb(126, 126, 126);
		border-radius: 10px;
    padding: 10px;

    header {
        display: grid;
            grid-template-columns: 1fr;
            justify-items: center;
            align-items: center;
            gap: 5px;

        select {
            width: 100%;
        }

        .set-count {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;

            input {
                width: 32px;
            }
        }
    }

    input,
    select {
        background: white;
    }
}

@media only screen and (min-width: 420px) {
    .ExerciseForm {
        header {
            grid-template-columns: auto 1fr auto auto;
        }
    }
}

@media only screen and (min-width: 600px) {
    .ExerciseForm {
        header {

        }
    }
}
</style>
