<template>
<v-dialog
	:fullscreen="windowStore.width < 600"
	scrollable
	persistent
	v-model="dialog"
	:max-width="windowStore.width >= 600 ? '400px' : '100%'"
>
	<template
		v-slot:activator="{ props: dialog }"
	>
		<v-tooltip
			text="Add Routine as Workout"
			:open-delay="125"
		>
			<template
				v-slot:activator="{ props: tooltip }"
			>
				<v-btn
					v-bind="mergeProps(dialog, tooltip)"
				>
					<v-icon
						icon="mdi-notebook"
						size="xx-large"
					></v-icon>
				</v-btn>
			</template>
		</v-tooltip>
	</template>
	<v-card
		class="d-flex justify-center align-center pa-2 rounded-lg bg-blue-grey-lighten-3 text-black"
	>
        <template v-slot:prepend>
			<v-icon
				icon="mdi-notebook"
				size="xx-large"
				color="primary"
			></v-icon>
		</template>
		<template v-slot:title>Add Routine as Workout</template>
		<v-card-actions class="d-flex flex-column justify-center align-center">
			<v-select
				name="routine"
				id="routine"
				ref="routine"
				v-model="routineName"
				label="Select Routine"
				:items="routineStore.routines.map(routine => routine.attributes.name)"
				class="w-100">
			</v-select>
			<v-btn
				title="Log Routine as Workout"
				@click="useRoutine"
				append-icon="mdi-notebook"
			>Log Routine as Workout</v-btn>
			<CloseButton
				@click="dialog = false"
			/>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, mergeProps } from 'vue';
// Pinia stores
import { useWindowStore } from '../../../stores/windowStore';
import { useRoutineStore } from '../../../stores/routineStore';
import { useWorkoutStore } from '@/stores/workoutStore';
// Type interfaces
import { Workout } from '../../../types/index';
// Local components
import CloseButton from '@/components/buttons/CloseButton.vue';

export default defineComponent({
    data () {
        return ({
            windowStore: useWindowStore(),
            routineStore: useRoutineStore(),
			workoutStore: useWorkoutStore(),
            dialog: false,
            routineName: ''
        });
    },
    methods: {
        useRoutine () {
			const routine = this.routineStore.getRoutineByName(this.routineName);

			if (routine) {
				const workout = ({
					date: this.workoutStore.date.toLocaleDateString('en-CA').split('T')[0],
					entries: routine.attributes.entries
				} as Workout);

				this.workoutStore.addWorkout(workout);
			}
		},
		mergeProps
    },
	components: {
		CloseButton
	}
})
</script>
