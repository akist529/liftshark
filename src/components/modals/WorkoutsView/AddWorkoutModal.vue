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
					@click="checkWorkouts"
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
		:class="modeStore.darkMode ? 'bg-blue-grey-darken-3 d-flex justify-center align-center rounded-lg h-100' : 'bg-blue-grey-lighten-3 d-flex justify-center align-center rounded-lg h-100'"
	>
		<v-card-title
			class="text-uppercase text-wrap text-center w-75"
		>
			<v-icon
				icon="mdi-dumbbell"
				size="xx-large"
			></v-icon>
			{{ workoutStore.days[workoutStore.date.getDay()] }}, {{ workoutStore.months[workoutStore.date.getMonth()] }} {{ workoutStore.date.getDate() }}, {{ workoutStore.date.getFullYear() }}
		</v-card-title>
		<v-card-actions
			class="w-100 d-flex justify-center align-center"
		>
			<v-tabs
				bg-color="primary"
				show-arrows
				fixed-tabs
				centered
				density="compact"
				v-model="workoutStore.tab"
			>
				<v-tab
					v-for="(entry, index) in workoutStore.entries"
					:key="index"
					:value="index"
				>Exercise {{ index + 1 }}</v-tab>
			</v-tabs>
			<v-tooltip text="Add Exercise" :open-delay="125">
				<template v-slot:activator="{ props }">
					<v-btn
						v-bind="props"
						class="bg-primary rounded-0"
						@click="workoutStore.addEntry"
					>
						<v-icon
							icon="mdi-plus"
							size="xx-large"
						></v-icon>
					</v-btn>
				</template>
			</v-tooltip>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
		<v-card-text
			class="w-100 pa-2"
		>
			<v-window
				v-model="workoutStore.tab"
				class="bg-blue-grey-darken-4 pa-3 h-100"
			>
				<v-window-item
					v-for="(entry, index) in workoutStore.entries"
					:key="index"
					:value="index"
				>
					<ExerciseForm
						:entry="entry"
						modal="workout"
						:exercises="filteredExercises"
					/>
				</v-window-item>
			</v-window>
		</v-card-text>
		<v-card-actions>
			<v-btn
				@click="addWorkout"
				class="bg-primary"
				prepend-icon="mdi-plus"
			>
				Add Workout
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
import { ExerciseData, Exercise } from '@/types/index';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useWindowStore } from '@/stores/windowStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
import { useModeStore } from '@/stores/modeStore';
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
		const exerciseQuery = useQuery('exercises', () => getData());

        return ({
            workoutStore: useWorkoutStore(),
			windowStore: useWindowStore(),
			snackbarStore: useSnackbarStore(),
			modeStore: useModeStore(),
			exerciseQuery,
			dialog: false,
			snackbar: false
        });
    },
    components: {
        CloseButton,
		ExerciseForm
    },
	methods: {
		addWorkout (e: MouseEvent) {
			e.preventDefault();

			const workout = ({
				date: this.workoutStore.date.toLocaleDateString('en-CA').split('T')[0],
				entries: this.workoutStore.entries
			});

			this.workoutStore.addWorkout(workout);
			this.dialog = false;
			this.snackbarStore.text = 'Workout successfully logged';
			this.snackbarStore.color = 'success';
			this.snackbarStore.icon = 'mdi-check';
			this.snackbarStore.open = true;
		},
		checkWorkouts () {
			const numOfWorkouts = this.workoutStore.workouts.filter(workout => workout.attributes.date === this.workoutStore.date.toLocaleDateString('en-CA').split('T')[0]);

			if (numOfWorkouts.length === 2) {
				this.dialog = false;
				this.snackbarStore.text = 'Workout limit reached for this day. Take it easy!';
				this.snackbarStore.color = 'error';
				this.snackbarStore.icon = 'mdi-alert-circle';
				this.snackbarStore.open = true;
			}
		},
		mergeProps
	},
	computed: {
		filteredExercises (): Exercise[] {
			if (this.exerciseQuery.data) {
				const filtered = Array.from(this.exerciseQuery.data.results);

				for (let i = 0; i < filtered.length - 1; i++) {
					if (filtered[i].name === filtered[i + 1].name) {
						filtered.splice(i + 1, 1);
					}
				}

				return filtered;
			} else {
				return [];
			}
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
