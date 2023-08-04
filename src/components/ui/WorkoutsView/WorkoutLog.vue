<template>
<div v-if="workout" class="WorkoutLog">
	<DeleteButton
		title="Delete Workout"
		@click="workoutStore.deleteWorkout(workout.id)" />
	<span>{{ workout.attributes.date }}</span>
	<ul class="exercises">
		<table v-for="entry in workout.attributes.entries" :key="entry.key">
			<thead>{{ entry.name }}</thead>
			<tbody>
			<tr id="exercise-headers">
				<th>SET</th>
				<th>REPS</th>
				<th>WEIGHT</th>
			</tr>
			<tr v-for="set in entry.sets.length" :key="set" class="set">
				<td>{{ set }}</td>
				<td>{{ entry.sets[set - 1].reps }}</td>
				<td>{{ entry.sets[set - 1].weight }} lbs.</td>
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
import { WorkoutData } from '@/types/index';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
// Local components
import DeleteButton from '@/components/buttons/DeleteButton.vue';

export default defineComponent({
	data () {
		const workoutStore = useWorkoutStore();

		return ({
			workoutStore
		});
	},
	components: {
		DeleteButton
	},
	props: {
		workout: {
			type: Object as PropType<WorkoutData>,
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
