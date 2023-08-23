<template>
<v-dialog
	:fullscreen="windowStore.width < 600"
	scrollable
	persistent
	v-model="dialog"
	class="RoutineModal w-100 h-100"
	:max-width="windowStore.width >= 600 ? '400px' : '100%'"
>
	<template
		v-slot:activator="{ props: dialog }"
	>
		<v-tooltip
			text="Add New Routine"
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
	>
		<v-card-title
			class="d-flex flex-column justify-center align-center w-75"
		>
			<v-text-field
				v-model="name"
				hide-details="auto"
				density="compact"
				type="text"
				label="Name"
				class="w-100"
			></v-text-field>
		</v-card-title>
		<v-card-actions class="w-100 d-flex justify-center align-center">
			<v-tabs
				bg-color="primary"
				show-arrows
				fixed-tabs
				centered
				density="compact"
			>
				<v-tab
					v-for="entry in entryCount"
					:key="entry"
					:value="entry"
				>{{ entry }}</v-tab>
			</v-tabs>
			<v-tooltip text="Add Exercise" :open-delay="125">
				<template v-slot:activator="{ props }">
					<v-btn
						v-bind="props"
						class="bg-primary rounded-0"
						@click="entryCount++"
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
			class="w-100 bg-blue-grey-lighten-1"
		>
			<v-form
				class="w-100"
			>
				<v-window>
					<v-window-item
						v-for="exercise in entryCount"
						:key="exercise"
					>
						<ExerciseForm
							:exercises="exerciseQuery.data.results"
							:count="exercise"
							@deleteExercise="deleteExercise($event)"
						/>
					</v-window-item>
				</v-window>
			</v-form>
		</v-card-text>
		<v-card-actions>
			<v-btn
				@click="addRoutine"
				prepend-icon="mdi-notebook"
				class="bg-primary"
			>Add Routine</v-btn>
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
import { useRoutineStore } from '@/stores/routineStore';
import { useWindowStore } from '@/stores/windowStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
// Local components
import CloseButton from '../buttons/CloseButton.vue';
import ExerciseForm from './WorkoutModal/ExerciseForm.vue';

const getData = async (): Promise<ExerciseData> => {
	return await fetch('https://wger.de/api/v2/exercise?limit=999&language=2')
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
    data () {
		const routineStore = useRoutineStore();
		const windowStore = useWindowStore();
		const snackbarStore = useSnackbarStore();
		const exerciseQuery = useQuery('exercises', () => getData());
		const entryCount = 1;
		const name = 'New Routine';

        return ({
            routineStore,
			windowStore,
			snackbarStore,
			exerciseQuery,
			entryCount,
			dialog: false,
			snackbar: false,
			name
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
		addRoutine (e: MouseEvent) {
			e.preventDefault();

			const routine = ({
				name: this.name,
				day: this.routineStore.weekdays[this.routineStore.activeDay],
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

				routine.entries.push(entry);
			}

			this.routineStore.addRoutine(routine);
			this.dialog = false;
			this.snackbarStore.text = 'Routine successfully added';
			this.snackbarStore.color = 'success';
			this.snackbarStore.open = true;
		},
		mergeProps
	}
});
</script>

<style scoped lang="scss">
.RoutineModal {
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
