<template>
<v-card v-if="workout" class="bg-blue-grey rounded">
	<v-card-actions>
		<DeleteButton
			title="Delete Workout"
			:style="{position: 'absolute', top: '5px', right: '5px'}"
			@click="workoutStore.deleteWorkout(workout.id)" />
	</v-card-actions>
	<v-card-title class="d-flex justify-center align-center">
		<span>{{ workoutStore.days[workoutStore.date.getDay()] }}, {{ workoutStore.months[workoutStore.date.getMonth()] }} {{ workoutStore.date.getDate() }}, {{ workoutStore.date.getFullYear() }}</span>
	</v-card-title>
	<v-card-text>
		<v-list>
			<v-list-item v-for="entry in workout.attributes.entries" :key="entry.key">
				<v-table>
					<caption>{{ entry.name }}</caption>
					<tbody>
						<tr id="exercise-headers">
							<th>SET</th>
							<th>REPS</th>
							<th>WEIGHT</th>
						</tr>
						<tr v-for="set in entry.sets.length" :key="set">
							<td class="d-flex justify-center align-center">{{ set }}</td>
							<td>{{ entry.sets[set - 1].reps }}</td>
							<td class="d-flex justify-center align-center">{{ entry.sets[set - 1].weight }} lbs.</td>
						</tr>
					</tbody>
				</v-table>
			</v-list-item>
		</v-list>
	</v-card-text>
</v-card>
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
