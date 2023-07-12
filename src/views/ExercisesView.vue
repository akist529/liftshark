<template>
<main class="ExercisesView" ref="view">
	<h1>Exercises</h1>
	<nav class="page-buttons">
		<BackButton
			@click="getPage('previous')" />
		<ForwardButton
			@click="getPage('next')" />
	</nav>
	<h1 v-if="error">Error!</h1>
	<LoadIcon v-if="!loaded" />
	<ul v-if="loaded" class="exercise-list">
		<MyExercise v-for="exercise in exercises"
			:key="exercise.id"
			:exercise="exercise" />
	</ul>
	<nav class="page-buttons">
		<BackButton
			@click="getPage('previous')" />
		<ForwardButton
			@click="getPage('next')" />
	</nav>
	<MyFooter />
</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Exercise } from '@/types/index';
// Mixins
import { fetchData } from '@/mixins/fetchData';
// Local components
import MyExercise from '@/components/ui/ExercisesView/MyExercise.vue';
import MyFooter from '@/components/ui/ExercisesView/MyFooter.vue';
import BackButton from '@/components/buttons/BackButton.vue';
import ForwardButton from '@/components/buttons/ForwardButton.vue';
import LoadIcon from '@/components/LoadIcon.vue';

export default defineComponent({
	data () {
		const exercises: Exercise[] = [];

		return ({
			exercises,
			offset: 0,
			loaded: false,
			error: false
		});
	},
	methods: {
		getPage: async function (direction: string) {
			this.loaded = false;

			if (direction === 'next') {
				this.offset += 10;
			} else this.offset -= 10;

			if (this.offset < 0) this.offset = 0;

			await this.getResults(`https://wger.de/api/v2/exercise/?limit=10&offset=${this.offset}&language=2`, 'name')
				.then(data => {
					if (data === null) return;

					if (data.length > 0) this.exercises = data;
						else this.offset -= 10;

					(this.$refs.view as HTMLDivElement).scrollTo({ top: 0, behavior: 'smooth' });
				}).catch(error => {
					console.log(error);
				});

			this.loaded = true;
		}
	},
	mixins: [fetchData],
	components: {
		MyExercise,
		MyFooter,
		BackButton,
		ForwardButton,
		LoadIcon
	},
	async created () {
		this.getResults('https://wger.de/api/v2/exercise/?limit=10&language=2', 'name')
			.then(data => {
				if (data && data.length) {
					this.exercises = data;
					this.loaded = true;
					this.error = false;
				}
			}).catch(error => {
				console.log(error);
				this.loaded = true;
				this.error = true;
			});
	}
})
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
		font-family: var(--title-font);
			font-weight: 700;
	}

	.page-buttons {
		display: flex;
			justify-content: space-evenly;
		width: 100%;
	}

	.exercise-list {
		display: grid;
			grid-template-rows: repeat(auto-fill, auto);
			grid-template-columns: auto;
			gap: 20px;
	}
}
</style>
