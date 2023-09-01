<template>
<v-card
	v-if="workout || routine"
	:class="modeStore.darkMode ? 'd-flex flex-column justify-center align-center bg-blue-grey-darken-3 overflow-scroll' : 'd-flex flex-column justify-center align-center bg-blue-grey-lighten-3'"
	:width="300"
>
	<v-card-actions
		v-if="!preview"
	>
		<v-tooltip :text="workout ? 'Edit Workout' : 'Edit Routine'">
			<template v-slot:activator="{ props }">
				<v-btn
					v-bind="props"
					variant="plain"
					:style="{ position: 'absolute', top: '5px', left: '5px' }">
					<v-icon
						icon="mdi-book-edit"
						size="xx-large"
					></v-icon>
				</v-btn>
			</template>
		</v-tooltip>
		<v-tooltip :text="workout ? 'Delete Workout' : 'Delete Routine'">
			<template v-slot:activator="{ props }">
				<DeleteButton
					v-bind="props"
					:style="{ position: 'absolute', top: '5px', right: '5px' }"
					@click="deleteItem"
				/>
			</template>
		</v-tooltip>
	</v-card-actions>
	<v-card-title
		v-if="!preview"
		class="d-flex justify-center align-center"
	>
		<span
			v-if="workout"
		>{{ workoutStore.days[workoutStore.date.getDay()] }}, {{ workoutStore.months[workoutStore.date.getMonth()] }} {{ workoutStore.date.getDate() }}, {{ workoutStore.date.getFullYear() }}</span>
		<span
			v-else-if="routine"
		>{{ routine.attributes.name }}</span>
	</v-card-title>
	<v-card-text class="overflow-y-auto">
		<v-list
			:class="modeStore.darkMode ? 'bg-blue-grey-darken-4' : 'bg-blue-grey-lighten-4'"
			:height="300"
		>
			<v-list-item
				v-for="entry in entries"
				:key="entry.key"
			>
				<v-table
					:class="modeStore.darkMode ? 'bg-blue-grey-darken-4 text-white' : 'bg-blue-grey-lighten-4 text-black'"
				>
					<caption>{{ entry.name }}</caption>
					<tbody>
						<tr
							id="exercise-headers"
						>
							<th>SET</th>
							<th>REPS</th>
							<th>WEIGHT</th>
						</tr>
						<tr
							v-for="set in entry.sets.length"
							:key="set"
						>
							<td
								class="d-flex justify-center align-center"
							>{{ set }}</td>
							<td>{{ entry.sets[set - 1].reps }}</td>
							<td
								class="d-flex justify-center align-center"
							>{{ entry.sets[set - 1].weight }} lbs.</td>
						</tr>
					</tbody>
				</v-table>
			</v-list-item>
		</v-list>
	</v-card-text>
</v-card>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Type interfaces
import { WorkoutData, RoutineData } from '@/types/index';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useRoutineStore } from '@/stores/routineStore';
import { useModeStore } from '@/stores/modeStore';
// Local components
import DeleteButton from '@/components/buttons/DeleteButton.vue';

export default defineComponent({
	data () {
		return ({
			workoutStore: useWorkoutStore(),
			routineStore: useRoutineStore(),
			modeStore: useModeStore()
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
