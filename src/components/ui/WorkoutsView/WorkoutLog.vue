<template>
<div v-if="routine" class="WorkoutLog">
	<DeleteButton
		title="Delete Workout"
		@click="workoutStore.deleteWorkout(workout.id)" />
	<span>{{ routine.attributes.name }}</span>
	<ul class="exercises">
		<table v-for="exercise in routine.attributes.exercises" :key="exercise.id">
			<thead>{{ exercise.name }}</thead>
			<tbody>
			<tr id="exercise-headers">
				<th>SET</th>
				<th>REPS</th>
				<th>WEIGHT</th>
			</tr>
			<tr v-for="set in exercise.sets.length" :key="set" class="set">
				<td>{{ set }}</td>
				<td>{{ exercise.sets[set - 1].reps }}</td>
				<td>{{ exercise.sets[set - 1].weight }} lbs.</td>
			</tr>
			</tbody>
		</table>
	</ul>
</div>
</template>

<script scoped lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Type interfaces
import { Workout } from '@/types/index';
// Pinia stores
import { useRoutineStore } from '@/stores/routineStore';
import { useWorkoutStore } from '@/stores/workoutStore';
// Local components
import DeleteButton from '@/components/buttons/DeleteButton.vue';

export default defineComponent({
	data () {
		const workoutStore = useWorkoutStore();
		const routineStore = useRoutineStore();
		const routine = routineStore.getRoutineById(this.workout.attributes.routine);

		return ({
			routine,
			routineStore,
			workoutStore
		});
	},
	components: {
		DeleteButton
	},
	props: {
		workout: {
			type: Object as PropType<Workout>,
			required: true
		}
	}
});
</script>

<style scoped lang="scss">
.WorkoutLog {
	/* Positioning */
    position: relative;
		z-index: 0;

	/* Visual */
    background-color: rgb(215, 215, 215);
    border: 3px solid rgb(175, 175, 175);
    padding: 35px 10px 10px;

    .exercises {
        table {
            display: flex;
				flex-direction: column;

            #exercise-headers {
              display: grid;
				grid-template-columns: repeat(3, 1fr);
            }

            .set {
              display: grid;
				grid-template-columns: repeat(3, 1fr);
				justify-items: center;
            }
        }
    }
}
</style>
