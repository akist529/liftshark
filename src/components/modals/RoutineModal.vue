<template>
<v-dialog
	:fullscreen="windowStore.width < 600"
	scrollable
	persistent
	v-model="dialog"
	class="RoutineModal"
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
					@click="checkRoutines"
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
		:class="modeStore.darkMode ? 'bg-blue-grey-darken-3 d-flex justify-center align-center pa-2 rounded-lg' : 'bg-blue-grey-lighten-3 d-flex justify-center align-center pa-2 rounded-lg'"
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
		<v-card-actions
			class="w-100 d-flex justify-center align-center"
		>
			<v-tabs
				bg-color="primary"
				show-arrows
				fixed-tabs
				centered
				density="compact"
				v-model="routineStore.tab"
			>
				<v-tab
					v-for="(entry, index) in routineStore.entries"
					:key="index"
					:value="index"
				>Exercise {{ index + 1 }}</v-tab>
			</v-tabs>
			<v-tooltip text="Add Exercise" :open-delay="125">
				<template v-slot:activator="{ props }">
					<v-btn
						v-bind="props"
						class="bg-primary rounded-0"
						@click="routineStore.addEntry"
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
				v-model="routineStore.tab"
				class="bg-blue-grey-darken-4 pa-3 h-100"
			>
				<v-window-item
					v-for="(entry, index) in routineStore.entries"
					:key="index"
					:value="index"
				>
					<ExerciseForm
						:entry="entry"
						modal="routine"
						:exercises="exerciseQuery.data.results"
					/>
				</v-window-item>
			</v-window>
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
import { useModeStore } from '@/stores/modeStore';
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
		const exerciseQuery = useQuery('exercises', () => getData());

        return ({
            routineStore: useRoutineStore(),
			windowStore: useWindowStore(),
			snackbarStore: useSnackbarStore(),
			modeStore: useModeStore(),
			exerciseQuery,
			entryCount: 1,
			dialog: false,
			snackbar: false,
			name: 'New Routine'
        });
    },
    components: {
        CloseButton,
		ExerciseForm
    },
	methods: {
		addRoutine (e: MouseEvent) {
			e.preventDefault();

			const routine = ({
				name: this.name,
				day: this.routineStore.weekdays[this.routineStore.activeDay],
				entries: this.routineStore.entries
			});

			this.routineStore.addRoutine(routine);
			this.dialog = false;
			this.snackbarStore.text = 'Routine successfully added';
			this.snackbarStore.color = 'success';
			this.snackbarStore.icon = 'mdi-check';
			this.snackbarStore.open = true;
		},
		checkRoutines () {
			const numOfRoutines = this.routineStore.routines.filter(routine => routine.attributes.day === this.routineStore.weekdays[this.routineStore.activeDay]);

			if (numOfRoutines.length === 2) {
				this.dialog = false;
				this.snackbarStore.text = 'You already have 2 routines for this day!';
				this.snackbarStore.color = 'error';
				this.snackbarStore.icon = 'mdi-alert-circle';
				this.snackbarStore.open = true;
			}
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
