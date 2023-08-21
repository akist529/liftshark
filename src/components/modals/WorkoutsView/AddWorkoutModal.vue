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
			text="Add New Workout"
			:open-delay="125"
		>
			<template
				v-slot:activator="{ props: tooltip }"
			>
				<v-btn
					v-bind="mergeProps(dialog, tooltip)"
				>
					<v-icon
						icon="mdi-plus"
						size="xx-large"
					></v-icon>
				</v-btn>
			</template>
		</v-tooltip>
	</template>
	<v-card
		v-if="exerciseQuery.isSuccess"
		class="d-flex justify-center align-center pa-2 rounded-lg bg-blue-grey-lighten-3 text-black"
		prepend-icon="mdi-dumbbell"
	>
		<template v-slot:title>
			<span>New Workout</span><br/>
			<span>{{ workoutStore.days[workoutStore.date.getDay()] }}, {{ workoutStore.months[workoutStore.date.getMonth()] }} {{ workoutStore.date.getDate() }}, {{ workoutStore.date.getFullYear() }}</span>
		</template>
		<v-card-actions>
			<v-tabs
				v-model="entryCount"
				bg-color="primary"
				class="w-100"
				show-arrows
				fixed-tabs
				centered
			>
				<v-tab
					v-for="entry in entryCount"
					:key="entry"
					:value="entry"
				>{{ entry }}</v-tab>
				<v-tab
					@click="entryCount++"
					prepend-icon="mdi-dumbbell"
				>Add Exercise</v-tab>
			</v-tabs>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
		<v-card-text
			class="w-100 bg-blue-grey-lighten-1"
		>
			<v-window v-model="entryCount">
					<ExerciseForm
						v-for="entry in entryCount"
						:key="entry"
						:exercises="exerciseQuery.data.results"
						:count="entry"
						@deleteExercise="deleteExercise($event)"
					/>
			</v-window>
		</v-card-text>
		<v-card-actions>
			<v-btn
				title="Add New Workout"
				@click="addWorkout"
			>
				<v-icon
					icon="mdi-plus"
					size="xx-large"
				></v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, mergeProps } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Type interfaces
import { ExerciseData, Entry, Set } from '@/types/index';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useWindowStore } from '@/stores/windowStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
// Local components
import CloseButton from '@/components/buttons/CloseButton.vue';
import ExerciseForm from '../WorkoutModal/ExerciseForm.vue';

const getData = async (): Promise<ExerciseData> => {
	return await fetch('https://wger.de/api/v2/exercise?limit=999&language=2')
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
    data () {
        const workoutStore = useWorkoutStore();
		const windowStore = useWindowStore();
		const snackbarStore = useSnackbarStore();
		const exerciseQuery = useQuery('exercises', () => getData());
		const entryCount = 1;

        return ({
            workoutStore,
			windowStore,
			snackbarStore,
			exerciseQuery,
			entryCount,
			dialog: false,
			snackbar: false
        });
    },
    components: {
        CloseButton,
		ExerciseForm
    },
	methods: {
		deleteExercise (e: MouseEvent) {
			e.preventDefault();

			if (this.entryCount > 1) {
				this.entryCount--;
			}
		},
		addWorkout (e: MouseEvent) {
			e.preventDefault();

			const workout = ({
				date: this.workoutStore.date.toISOString().split('T')[0],
				entries: [] as Entry[]
			});

			for (let i = 1; i <= this.entryCount; i++) {
				const name = document.getElementById(`exercise-${i}-name`) as HTMLSelectElement;

				const entry = ({
					key: i,
					name: name.value || `Exercise ${i}`,
					sets: []
				} as Entry);

				for (let j = 1; j <= 6; j++) {
					const reps = document.getElementById(`exc-${i}-repCount-${j}`) as HTMLInputElement;
					const weight = document.getElementById(`exc-${i}-weight-${j}`) as HTMLInputElement;

					if (reps && weight) {
						entry.sets.push({
							key: j,
							weight: Number(weight.value),
							reps: Number(reps.value)
						} as Set)
					}
				}

				workout.entries.push(entry);
			}

			console.log(workout);
			this.workoutStore.addWorkout(workout);
			this.dialog = false;
			this.snackbarStore.text = 'Workout successfully logged';
			this.snackbarStore.color = 'success';
			this.snackbarStore.open = true;
		},
		mergeProps
	}
});
</script>

<style scoped lang="scss">
.WorkoutModal {
	/* Visual */
	font-family: 'Karla';
	text-transform: uppercase;

	.btn-add-exercise {
		font-size: 16px;
		text-transform: uppercase;
		font-weight: 700;
	}

	h1 {
		font-size: 32px;
	}

	h2 {
		font-size: 24px;
	}
}
</style>
