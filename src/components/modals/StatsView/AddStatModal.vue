<template>
<v-dialog scrollable persistent v-model="dialog" class="StatsModal w-100 h-100" :max-width="windowStore.width >= 600 ? '400px' : '100%'">
	<template v-slot:activator="{ props }">
		<v-btn
			v-bind="props"
            title="Add New Statistic"
        >
            <v-icon
                icon="mdi-plus"
                size="xx-large"
            ></v-icon>
        </v-btn>
	</template>
	<v-card class="d-flex justify-center align-center pa-2 rounded-lg bg-blue-grey-lighten-3 text-black">
		<v-card-title class="d-flex justify-center align-center w-100">
			<h1>Log Statistic</h1>
		</v-card-title>
		<v-card-actions class="d-flex flex-wrap justify-center align-center w-100" :style="{gap: '10px'}">
			<v-tabs v-model="statStore.tab" bg-color="primary">
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
					prepend-icon="mdi-weight-lifter"
					:stacked="windowStore.width < 600"
					@click="$emit('prs')"
				>PRs</v-tab>
			</v-tabs>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
		<v-card-text v-if="isSuccess && data" class="d-flex justify-center align-center w-100">
			<v-window v-model="statStore.tab">
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
							label="New Record (lbs)"
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
			>Add</v-btn>
			<v-btn
				@click="dialog = false"
				variant="flat"
				color="error"
			>Close</v-btn>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Pinia stores
import { useStatStore } from '@/stores/statStore';
import { useExerciseStore } from '@/stores/exerciseStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
import { useWindowStore } from '@/stores/windowStore';
// Local components
import CloseButton from '@/components/buttons/CloseButton.vue';
// Type interfaces
import { ExerciseData } from '@/types';

const getData = async (url: string): Promise<ExerciseData> => {
	return await fetch(url)
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
    data () {
        const statStore = useStatStore();
		const exerciseStore = useExerciseStore();
		const snackbarStore = useSnackbarStore();
		const windowStore = useWindowStore();
		const weight = 0;
		const muscle = 'Upper Arm';
		const measurement = 0;
		const { error, isError, isLoading, isFetching, isSuccess, data, refetch } = useQuery('exercises', () => getData('https://wger.de/api/v2/exercise/?language=2&limit=999'));
		const exercise = '';
		const record = 0;

        return ({
            statStore,
			exerciseStore,
			snackbarStore,
			windowStore,
			dialog: false,
			weight,
			muscle,
			measurement,
			error,
			isError,
			isLoading,
			isFetching,
			isSuccess,
			data,
			refetch,
			exercise,
			record
        });
    },
    components: {
        CloseButton
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

			this.dialog = false;
			this.snackbarStore.text = 'Stat successfully added';
			this.snackbarStore.color = 'success';
			this.snackbarStore.open = true;
		},
		addWeight () {
			this.statStore.addWeight(this.weight);
		},
		addMeasurement () {
			this.statStore.addMeasurement(this.muscle, this.measurement);
		},
		addRecord () {
			const exercise = this.data?.results.find(exercise => exercise.name === this.exercise);
			if (!exercise) return;

			this.statStore.addRecord(exercise.exercise_base, this.record);
		}
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
