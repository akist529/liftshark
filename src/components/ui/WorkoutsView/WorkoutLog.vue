<template>
<v-card v-if="workout || routine" class="bg-blue-grey rounded">
	<v-card-actions v-if="!preview">
		<DeleteButton
			:title="workout ? 'Delete Workout' : 'Delete Routine'"
			:style="{position: 'absolute', top: '5px', right: '5px'}"
			@click="deleteItem" />
	</v-card-actions>
	<v-card-title class="d-flex justify-center align-center">
		<span v-if="workout">{{ workoutStore.days[workoutStore.date.getDay()] }}, {{ workoutStore.months[workoutStore.date.getMonth()] }} {{ workoutStore.date.getDate() }}, {{ workoutStore.date.getFullYear() }}</span>
		<span v-else-if="routine">{{ routine.attributes.name }}</span>
	</v-card-title>
	<v-card-text>
		<v-list>
			<v-list-item v-for="entry in entries" :key="entry.key">
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
import { WorkoutData, RoutineData } from '@/types/index';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useRoutineStore } from '@/stores/routineStore';
// Local components
import DeleteButton from '@/components/buttons/DeleteButton.vue';

export default defineComponent({
	data () {
		const workoutStore = useWorkoutStore();
		const routineStore = useRoutineStore();

		return ({
			workoutStore,
			routineStore
		});
	},
	components: {
		DeleteButton
	},
	props: {
		workout: {
			type: Object as PropType<WorkoutData>,
			required: false
		},
		routine: {
			type: Object as PropType<RoutineData>,
			required: false
		},
		preview: {
			type: Boolean as PropType<boolean>,
			required: true
		}
	},
	methods: {
		deleteItem () {
			if (this.workout) {
				this.workoutStore.deleteWorkout(this.workout.id);
			} else if (this.routine) {
				this.routineStore.deleteRoutine(this.routine.id);
			}
		}
	},
	computed: {
		entries () {
			if (this.workout) {
				return this.workout.attributes.entries;
			} else if (this.routine) {
				return this.routine.attributes.entries;
			} else return [];
		}
	}
});
</script>
