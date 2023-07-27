<template>
<main class="ExercisesView" ref="view">
	<h1>Exercises</h1>
	<ExerciseNavBar v-if="isSuccess && data"
		:data="data"
		:refetch="refetch" />
	<h1 v-if="error || isError">Error!</h1>
	<LoadIcon v-if="isLoading || isFetching" />
	<ul v-if="isSuccess && data" class="exercise-list">
		<MyExercise v-for="exercise in data.results"
			:key="exercise.id"
			:exercise="exercise" />
	</ul>
	<ExerciseNavBar v-if="isSuccess && data"
		:data="data"
		:refetch="refetch" />
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
// Type interfaces
import { ExerciseData } from '@/types/index';
// Local components
import MyExercise from '@/components/ui/ExercisesView/MyExercise.vue';
import MyFooter from '@/components/ui/ExercisesView/MyFooter.vue';
import LoadIcon from '@/components/LoadIcon.vue';
import ExerciseNavBar from '@/components/ui/ExercisesView/ExerciseNavBar.vue';

const getData = async (url: string): Promise<ExerciseData> => {
	return await fetch(url)
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
	data () {
		const exerciseStore = useExerciseStore();
		const url = exerciseStore.url;
		const count = exerciseStore.count;

		const { error, isError, isLoading, isFetching, isSuccess, data, refetch } = useQuery(['exercises', exerciseStore.url], () => getData(exerciseStore.url));

		return ({
			exerciseStore,
			url,
			count,
			error,
			isError,
			isLoading,
			isFetching,
			isSuccess,
			data,
			refetch
		});
	},
	methods: {
		nextPage () {
			if (this.data && this.data.next !== null) {
				this.exerciseStore.updateUrl(this.data.next);
			}
		},
		previousPage () {
			if (this.data && this.data.previous !== null) {
				this.exerciseStore.updateUrl(this.data.previous);
			}
		},
		goToPage (page: number) {
			const offset = (page - 1) * 20;
			this.exerciseStore.updateUrl(`https://wger.de/api/v2/exercise/?limit=20&offset=${offset}&language=2`);
		}
	},
	watch: {
		exerciseStore: {
			deep: true,
			handler () {
				this.refetch();
				(this.$refs.view as HTMLDivElement).scrollTo({ top: 0, behavior: 'smooth' });
			}
		}
	},
	components: {
		MyExercise,
		MyFooter,
		LoadIcon,
		ExerciseNavBar
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

	.exercise-list {
		display: grid;
			grid-template-rows: repeat(auto-fill, auto);
			grid-template-columns: auto;
			gap: 20px;
	}
}
</style>
