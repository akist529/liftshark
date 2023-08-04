<template>
<v-dialog scrollable persistent v-model="dialog" class="StatsModal w-100 h-100" max-width="400px">
	<template v-slot:activator="{ props }">
		<AddButton
			v-bind="props"
			title="Add New Statistic"
			:style="{position: 'absolute', bottom: 30 + 'px', right: 30 + 'px'}" />
	</template>
	<v-card class="d-flex justify-center align-center pa-2 rounded-lg bg-blue-grey-lighten-3 text-black">
		<v-card-title class="d-flex justify-center align-center w-100">
			<h1>Log Statistic</h1>
		</v-card-title>
		<v-card-actions class="d-flex flex-wrap justify-center align-center w-100" :style="{gap: '10px'}">
			<v-btn
				prepend-icon="mdi-scale-bathroom"
				stacked
				@click="$emit('weight')"
				variant="flat"
				:class="(stat === 'Weight') ? 'bg-blue-lighten-3' : 'bg-grey-lighten-2'"
			>Weight</v-btn>
			<v-btn
				prepend-icon="mdi-tape-measure"
				stacked
				@click="$emit('measure')"
				variant="flat"
				:class="(stat === 'Measurements') ? 'bg-blue-lighten-3' : 'bg-grey-lighten-2'"
			>Measurements</v-btn>
			<v-btn
				prepend-icon="mdi-weight-lifter"
				stacked
				@click="$emit('prs')"
				variant="flat"
				:class="(stat === 'PRs') ? 'bg-blue-lighten-3' : 'bg-grey-lighten-2'"
			>PRs</v-btn>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
		<v-card-text v-if="isSuccess && data" class="d-flex justify-center align-center w-100">
			<v-form v-if="stat === 'Weight'" class="w-75">
				<v-text-field
					v-model="weight"
					hide-details="auto"
					density="compact"
					type="number"
					label="Weight (lbs)"
					append-icon="mdi-weight-pound"
				></v-text-field>
			</v-form>
			<v-form v-else-if="stat === 'Measurements'" class="w-75">
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
				></v-text-field>
			</v-form>
			<v-form v-else class="w-75">
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
			</v-form>
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
import { defineComponent, PropType } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Pinia stores
import { useStatStore } from '@/stores/statStore';
import { useExerciseStore } from '@/stores/exerciseStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
// Local components
import CloseButton from '../buttons/CloseButton.vue';
import AddButton from '../buttons/AddButton.vue';
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
		const weight = 0;
		const muscle = 'Upper Arm';
		const measurement = 0;
		const { error, isError, isLoading, isFetching, isSuccess, data, refetch } = useQuery(['exercises', exerciseStore.url], () => getData(exerciseStore.url));
		const exercise = '';
		const record = 0;

        return ({
            statStore,
			exerciseStore,
			snackbarStore,
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
        CloseButton,
		AddButton
    },
	props: {
		stat: {
			type: String as PropType<string>,
			required: true
		}
	},
	methods: {
		addStat (e: MouseEvent) {
			e.preventDefault();

			const statType = (() => {
				switch (this.stat) {
					case 'Weight':
						return 'weight';
					case 'Measurements':
						return 'measurement';
					case 'PRs':
						return 'record';
					default:
						return '';
				}
			})();

			const statNum = (() => {
				switch (this.stat) {
					case 'Weight':
						return this.weight;
					case 'Measurements':
						return this.measurement;
					case 'PRs':
						return this.record;
					default:
						return 0;
				}
			})();

			const statInfo = ({
				date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
				type: statType,
				stat: statNum
			});

			console.log(statInfo);
			this.dialog = false;
			this.snackbarStore.text = 'Stat successfully added';
			this.snackbarStore.color = 'success';
			this.snackbarStore.open = true;
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
