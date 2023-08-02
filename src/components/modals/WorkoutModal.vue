<template>
<v-dialog :fullscreen="windowStore.width < 600" scrollable persistent v-model="dialog" class="WorkoutModal w-100 h-100" max-width="400px">
	<template v-slot:activator="{ props }">
		<AddButton v-bind="props" />
	</template>
	<v-card v-if="exerciseQuery.isSuccess" class="d-flex justify-center align-center pa-2 rounded-lg bg-blue-grey-lighten-3 text-black">
		<v-card-title class="d-flex flex-column justify-center align-center">
			<h1>New Workout</h1>
			<h2>{{ workoutStore.getDay }}, {{ workoutStore.getMonth }} {{ workoutStore.selectedDate }}, {{ workoutStore.selectedYear }}</h2>
		</v-card-title>
		<v-card-actions>
			<v-btn
				class="btn-add-exercise"
				@click="exerciseCount++">
				Add Exercise
				<v-icon icon="mdi-dumbbell"></v-icon>
			</v-btn>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
		<v-card-text class="w-100 bg-blue-grey-lighten-1">
			<v-form class="w-100">
				<v-carousel class="rounded-lg w-100 h-100" show-arrows="hover" progress="primary">
					<ExerciseForm v-for="exercise in exerciseCount"
						:key="exercise"
						:exercises="exerciseQuery.data.results"
						:count="exercise"
						@deleteExercise="deleteExercise($event)" />
				</v-carousel>
			</v-form>
		</v-card-text>
		<v-card-actions>
			<AddButton
				title="Add Workout"
				@click="addWorkout" />
		</v-card-actions>
	</v-card>
</v-dialog>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Type interfaces
import { ExerciseData, Entry, Set } from '@/types/index';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useWindowStore } from '@/stores/windowStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
// Local components
import CloseButton from '../buttons/CloseButton.vue';
import ExerciseForm from './WorkoutModal/ExerciseForm.vue';
import AddButton from '../buttons/AddButton.vue';

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
		const exerciseCount = 1;

        return ({
            workoutStore,
			windowStore,
			snackbarStore,
			exerciseQuery,
			exerciseCount,
			dialog: false,
			snackbar: false
        });
    },
    components: {
        CloseButton,
		ExerciseForm,
		AddButton
    },
	methods: {
		deleteExercise (e: MouseEvent) {
			e.preventDefault();

			if (this.exerciseCount > 1) {
				this.exerciseCount--;
			}
		},
		addWorkout (e: MouseEvent) {
			e.preventDefault();

			const workout = ({
				date: `${this.workoutStore.selectedYear}-${this.workoutStore.selectedMonth}-${this.workoutStore.selectedDate}`,
				exercises: [] as Entry[]
			});

			for (let i = 1; i <= this.exerciseCount; i++) {
				const name = document.getElementById(`exercise-${i}-name`) as HTMLSelectElement;

				const exercise = ({
					id: i,
					name: name.value || `Exercise ${i}`,
					sets: []
				} as Entry);

				for (let j = 1; j <= 6; j++) {
					const reps = document.getElementById(`exercise-${i}-repCount-${j}`) as HTMLInputElement;
					const weight = document.getElementById(`exercise-${i}-weight-${j}`) as HTMLInputElement;

					if (reps && weight) {
						exercise.sets.push({
							id: j,
							weight: Number(weight.value),
							reps: Number(reps.value)
						} as Set)
					}
				}

				workout.exercises.push(exercise);
			}

			console.log(workout);
			this.dialog = false;
			this.snackbarStore.text = 'Workout successfully logged';
			this.snackbarStore.color = 'success';
			this.snackbarStore.open = true;
		}
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
