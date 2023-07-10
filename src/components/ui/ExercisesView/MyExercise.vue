<template>
<li className="ExerciseWrapper">
	<router-link class="link" :exerciseID="exerciseID" :to="{ name: 'exercise', params: { id: exerciseName.toLowerCase().replaceAll(' ', '-') } }">
		<main>
			<b>{{ exerciseName }}</b>
		</main>
		<div v-if="muscles.length">
			<header>
				<b>Primary Muscles:</b>
			</header>
			<ul>
				<li v-for="muscle in muscles" :key="muscle">
					<figure>
						<img
							:alt="muscle"
							:title="muscle"
							:src="assetspath(`./${getFileName(muscle)}`)" />
						<figcaption>{{ muscle.split(' ')[0] }}</figcaption>
					</figure>
				</li>
			</ul>
		</div>
		<div v-if="secondaryMuscles.length">
			<header>
				<b>Secondary Muscles:</b>
			</header>
			<ul>
				<li v-for="muscle in secondaryMuscles" :key="muscle">
					<figure>
						<img
						:alt="muscle"
						:title="muscle"
						:src="assetspath(`./${getFileName(muscle)}`)" />
						<figcaption>{{ muscle.split(' ')[0] }}</figcaption>
					</figure>
				</li>
			</ul>
		</div>
		<div v-if="equipment.length">
			<header>
				<b>Equipment</b>
			</header>
			<ul>
				<li v-for="item in equipment" :key="item">
					<figure>
						<img
							:alt="item"
							:title="item"
							:src="assetspath(`./${getFileName(item)}`)" />
						<figcaption>{{ item }}</figcaption>
					</figure>
				</li>
			</ul>
		</div>
		<img v-if="image"
			alt="Exercise Image"
			:src="image"
			className="exercise-image" />
	</router-link>
</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchData } from '@/mixins/fetchData';
import { fetchImages } from '@/mixins/fetchImages';

export default defineComponent({
	props: ['exerciseID', 'exerciseName', 'muscles', 'secondaryMuscles', 'equipment', 'image'],
	mixins: [fetchData, fetchImages],
	methods: {
		getFileName: function (item) {
			if (item === 'Obliquus externus abdominis') {
				return 'ui/exercises/obliques.webp';
			} else if (item === 'Soleus') {
				return 'ui/exercises/calves.webp';
			} else if (item === 'SZ-Bar') {
				return 'ui/exercises/ez-bar.webp';
			} else {
				return `ui/exercises/${item.toLowerCase().replaceAll(' ', '-').replaceAll(/[()]/g, '')}.webp`;
			}
		}
	}
});
</script>

<style scoped lang="scss">
.ExerciseWrapper {
	/* Positioning */
	display: flex;
		flex-direction: column;
		gap: 10px;

	/* Visual */
	border: 2px solid black;
		border-radius: 10px;
	padding: 10px;

	.link {
		color: black;
		text-decoration: none;

		main {
			margin: 0 auto;
			font-size: 1.5rem;
			text-align: center;
		}

		div {
			display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 5px;

			header {
				font-size: 1.25rem;
			}

			ul {
				display: grid;
					grid-template-columns: repeat(3, minmax(0px, auto));
					grid-row-gap: 5px;
				margin: 0 auto;

				li {
					list-style-type: none;
					padding: 0 20px;

					figure {
						display: flex;
							flex-direction: column;
							justify-content: space-between;
							align-items: center;
							gap: 2px;
						min-height: 40px;

						img {
							width: auto;
								max-width: 48px;
							height: auto;
								max-height: 48px;
						}

						figcaption {
							font-size: 16px;
							text-align: center;
							color: #8a8d91;
						}
					}
				}
			}
		}

		> img {
			display: flex;
			max-width: 250px;
			max-height: 250px;
			margin: 0 auto;
		}
	}
}
</style>
