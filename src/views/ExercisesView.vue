<template>
<main class="ExercisesView w-100" ref="view">
	<h1>Exercises</h1>
	<v-pagination
		v-if="exercises.isSuccess && exercises.data"
		v-model="exerciseStore.page"
		:length="Math.ceil(exercises.data.count / 20)"
		:total-visible="7"
		rounded="circle"
	></v-pagination>
	<v-container>
		<v-row v-if="exercises.error || exercises.isError">
			<v-col>
				<h1>Error!</h1>
			</v-col>
		</v-row>
		<v-row v-if="exercises.isLoading || muscles.isLoading || equipment.isLoading">
			<v-col>
				<LoadIcon />
			</v-col>
		</v-row>
		<v-row v-if="exercises.isSuccess && exercises.data && muscles.isSuccess && muscles.data && equipment.isSuccess && equipment.data">
			<v-col>
				<v-container>
					<v-row>
						<v-col v-for="exercise in exercises.data.results" :key="exercise.id" :cols="cols">
							<ExerciseCard
								:exercise="exercise"
								:muscles="muscles.data.results"
								:equipment="equipment.data.results" />
						</v-col>
					</v-row>
				</v-container>
			</v-col>
		</v-row>
	</v-container>
	<v-pagination
		v-if="exercises.isSuccess && exercises.data"
		v-model="exerciseStore.page"
		:length="Math.ceil(exercises.data.count / 20)"
		:total-visible="7"
		rounded="circle"
	></v-pagination>
	<MyFooter />
</main>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Pinia stores
import { useExerciseStore } from '@/stores/exerciseStore';
import { useWindowStore } from '@/stores/windowStore';
// Local components
import ExerciseCard from '@/components/ui/ExercisesView/ExerciseCard.vue';
import MyFooter from '@/components/ui/ExercisesView/MyFooter.vue';
import LoadIcon from '@/components/LoadIcon.vue';
// Type interfaces
import { ExerciseData } from '@/types/index';

const getExerciseData = async (page: number): Promise<ExerciseData> => {
	return await fetch(`https://wger.de/api/v2/exercise/?language=2&limit=20&offset=${(page - 1) * 20}`)
		.then(res => res.json())
		.catch(err => console.log(err));
}

const getData = async (url: string): Promise<any> => {
	return await fetch(url)
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
	data () {
		const exerciseStore = useExerciseStore();
		const windowStore = useWindowStore();

		const exercises = useQuery(['exercises', exerciseStore.page], () => getExerciseData(exerciseStore.page));
		const muscles = useQuery('muscles', () => getData('https://wger.de/api/v2/muscle?limit=999'));
		const equipment = useQuery('equipment', () => getData('https://wger.de/api/v2/equipment?limit=999'));

		return ({
			exerciseStore,
			windowStore,
			exercises,
			muscles,
			equipment
		});
	},
	watch: {
		exerciseStore: {
			deep: true,
			handler () {
				this.exercises.refetch();
				(this.$refs.view as HTMLDivElement).scrollTo({ top: 0, behavior: 'smooth' });
			}
		}
	},
	components: {
		ExerciseCard,
		MyFooter,
		LoadIcon
	},
	computed: {
		cols () {
			if (this.windowStore.width < 800) {
				return 12;
			} else if (this.windowStore.width < 992) {
				return 6;
			} else {
				return 4;
			}
		}
	}
});
</script>

<style scoped lang="scss">
.ExercisesView {
	/* Positioning */
	display: flex;
		flex-direction: column;
		gap: 10px;

	/* Visual */
	font-family: var(--content-font);

	h1 {
		display: flex;
			justify-content: center;
			align-items: center;
			gap: 10px;
		font-family: var(--title-font);
			font-weight: 700;

		&::after {
			display: inline-block;
			content: '';
			width: 64px;
			height: 64px;
			background-image: url('/public/images/icons/exercises.webp');
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center;
		}
	}
}
</style>
