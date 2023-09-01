<template>
<v-dialog
	scrollable
	persistent
	v-model="dialog"
	class="StatsModal w-100 h-100"
	:max-width="windowStore.width >= 600 ? '400px' : '100%'"
>
	<template
		v-slot:activator="{ props: dialog }"
	>
		<v-tooltip
			text="Add New Stat"
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
		:class="modeStore.darkMode ? 'bg-blue-grey-darken-3 d-flex justify-center align-center pa-2 rounded-lg' : 'bg-blue-grey-lighten-3 d-flex justify-center align-center pa-2 rounded-lg'"
	>
		<v-card-title class="d-flex justify-center align-center w-100">
			<v-icon
				icon="mdi-account-search"
				class="mr-1"
			></v-icon>
			Log Statistic
		</v-card-title>
		<v-card-actions
			class="d-flex flex-wrap justify-center align-center w-100"
			:style="{gap: '10px'}"
		>
			<VueDatePicker
				class="d-flex justify-center align-center"
				:dark="modeStore.darkMode ? true : false"
				v-model="statStore.date"
				ref="datepicker"
				:teleport="true"
				:enable-time-picker="false"
				@update:model-value="handleDate"
			/>
			<v-tabs
				v-model="tab"
				bg-color="primary"
				show-arrows
			>
				<v-tab
					value="weight"
					prepend-icon="mdi-scale-bathroom"
					:stacked="windowStore.width < 600"
					@click="$emit('weight')"
				>Weight</v-tab>
				<v-tab
					value="measurement"
					prepend-icon="mdi-tape-measure"
					:stacked="windowStore.width < 600"
					@click="$emit('measure')"
				>Measurements</v-tab>
				<v-tab
					value="record"
					prepend-icon="mdi-medal"
					:stacked="windowStore.width < 600"
					@click="$emit('prs')"
				>1-Rep Max</v-tab>
			</v-tabs>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
		<v-card-text v-if="isSuccess && data" class="d-flex justify-center align-center w-100">
			<v-window v-model="tab">
				<v-window-item value="weight">
					<v-responsive
						class="mx-auto"
						width="144"
					>
						<v-text-field
							v-model="weight"
							hide-details="auto"
							density="compact"
							type="number"
							label="Weight (lbs)"
							append-icon="mdi-weight-pound"
						></v-text-field>
					</v-responsive>
				</v-window-item>
				<v-window-item value="measurement">
					<v-responsive
						class="mx-auto"
						width="256"
					>
						<v-select
							v-model="muscle"
							label="Muscle"
							:items="['Upper Arm', 'Forearm', 'Chest', 'Thigh', 'Calf', 'Waist', 'Shoulder']"
							append-icon="mdi-arm-flex"
						></v-select>
						<v-text-field
							v-model="measurement"
							hide-details="auto"
							density="compact"
							type="number"
							label="Measurement (in)"
							class="w-100"
							append-icon="mdi-tape-measure"
							:min="1"
						></v-text-field>
					</v-responsive>
				</v-window-item>
				<v-window-item value="record">
					<v-responsive
						class="mx-auto"
						width="320"
					>
						<v-select
							v-model="exercise"
							label="Exercise"
							:placeholder="data.results[0].name"
							:items="data.results.map(exercise => exercise.name)"
							append-icon="mdi-dumbbell"
						></v-select>
						<v-text-field
							v-model="record"
							hide-details="auto"
							density="compact"
							type="number"
							label="1-Rep Max (lbs)"
							class="w-100"
							append-icon="mdi-medal"
						></v-text-field>
					</v-responsive>
				</v-window-item>
			</v-window>
		</v-card-text>
		<v-card-actions>
			<v-btn
				@click="addStat"
				variant="flat"
				color="success"
				prepend-icon="mdi-plus"
			>Add</v-btn>
			<v-btn
				@click="dialog = false"
				variant="flat"
				color="error"
				prepend-icon="mdi-close"
			>Close</v-btn>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, mergeProps } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Pinia stores
import { useStatStore } from '@/stores/statStore';
import { useExerciseStore } from '@/stores/exerciseStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
import { useWindowStore } from '@/stores/windowStore';
import { useModeStore } from '@/stores/modeStore';
// Local components
import CloseButton from '@/components/buttons/CloseButton.vue';
// Type interfaces
import { ExerciseData } from '@/types';
// Third-party components
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const getData = async (url: string): Promise<ExerciseData> => {
	return await fetch(url)
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
    data () {
		const { error, isError, isLoading, isFetching, isSuccess, data, refetch } = useQuery('exercises', () => getData('https://wger.de/api/v2/exercise/?language=2&limit=999'));

        return ({
            statStore: useStatStore(),
			exerciseStore: useExerciseStore(),
			snackbarStore: useSnackbarStore(),
			windowStore: useWindowStore(),
			modeStore: useModeStore(),
			dialog: false,
			weight: 0,
			muscle: 'Upper Arm',
			measurement: 0,
			error,
			isError,
			isLoading,
			isFetching,
			isSuccess,
			data,
			refetch,
			exercise: '',
			record: 0,
			tab: 'weight'
        });
    },
    components: {
        CloseButton,
		VueDatePicker
    },
	methods: {
		addStat (e: MouseEvent) {
			e.preventDefault();

			switch (this.statStore.tab) {
				case 'weight':
					this.addWeight();
					break;
				case 'measurement':
					this.addMeasurement();
					break;
				case 'record':
					this.addRecord();
					break;
				default:
					break;
			}
		},
		addWeight () {
			const weightExists = this.statStore.weights.find(weight => weight.attributes.date === this.statStore.date.toLocaleDateString('en-CA').split('T')[0]);

			if (weightExists) this.statStore.deleteWeight(weightExists.id);

			this.statStore.addWeight(this.weight);
			this.dialog = false;
			this.snackbarStore.text = 'Weight successfully added';
			this.snackbarStore.color = 'success';
			this.snackbarStore.icon = 'mdi-check';
			this.snackbarStore.open = true;
		},
		addMeasurement () {
			const measurementExists = this.statStore.measurements.find(measurement => {
				if (measurement.attributes.date === this.statStore.date.toLocaleDateString('en-CA').split('T')[0] &&
				measurement.attributes.muscle === this.muscle) {
					return true;
				} else return false;
			});

			if (measurementExists) this.statStore.deleteMeasurement(measurementExists.id);

			this.statStore.addMeasurement(this.muscle, this.measurement);
			this.dialog = false;
			this.snackbarStore.text = 'Measurement successfully added';
			this.snackbarStore.color = 'success';
			this.snackbarStore.icon = 'mdi-check';
			this.snackbarStore.open = true;
		},
		addRecord () {
			const exercise = this.data?.results.find(exercise => exercise.name === this.exercise);
			if (!exercise) return;

			const recordExists = this.statStore.records.find(record => {
				if (record.attributes.date === this.statStore.date.toLocaleDateString('en-CA').split('T')[0] &&
				record.attributes.exercise === exercise.exercise_base) {
					return true;
				} else return false;
			});

			if (recordExists) this.statStore.deleteRecord(recordExists.id);

			this.statStore.addRecord(exercise.exercise_base, this.record);
			this.dialog = false;
			this.snackbarStore.text = 'Record successfully added';
			this.snackbarStore.color = 'success';
			this.snackbarStore.icon = 'mdi-check';
			this.snackbarStore.open = true;
		},
		handleDate (modelData) {
			this.statStore.date = modelData;
			this.statStore.dateVal = this.statStore.date.getDate();
			this.statStore.dateString = modelData.toLocaleDateString('en-CA').split('T')[0];
		},
		mergeProps
	}
})
</script>

<style scoped lang="scss">
.StatsModal {
	/* Visual */
	font-family: 'Karla';
	text-transform: uppercase;

	h1 {
		font-size: 32px;
	}
}
</style>
