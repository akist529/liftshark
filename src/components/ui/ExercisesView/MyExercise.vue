<template>
<li className="MyExercise">
	<router-link :to="{ name: 'Exercise - Gym Tracker', params: { id: slug } }">
		<h2>{{ name }}</h2>
		<hr />
		<div v-if="exercise.muscles.length" class="item-group">
			<h3>Primary Muscles</h3>
			<ul>
				<li v-for="muscle in exercise.muscles" :key="muscle">
					<span :style="getLocalImage('muscles', getSlug(getMuscleName(muscle)))"></span>
					{{ getMuscleName(muscle) }}
				</li>
			</ul>
		</div>
		<div v-if="exercise.muscles_secondary.length" class="item-group">
			<h3>Secondary Muscles</h3>
			<ul>
				<li v-for="muscle in exercise.secondary_muscles" :key="muscle">
					<span :style="getLocalImage('muscles', getSlug(getMuscleName(muscle)))"></span>
					{{ getMuscleName(muscle) }}
				</li>
			</ul>
		</div>
		<div v-if="equipment.length" class="item-group">
			<h3>Equipment</h3>
			<ul>
				<li v-for="item in exercise.equipment" :key="item">
					<span :style="getLocalImage('equipment', getSlug(getEquipmentName(item)))"></span>
					{{ getEquipmentName(item) }}
				</li>
			</ul>
		</div>
		<div v-if="images.length">
			<ul>
				<li v-for="image in images" :key="image.id">
					<figure>
						<img v-if="image"
							alt="Exercise Image"
							:src="image.image"
							className="exercise-image" />
					</figure>
				</li>
			</ul>
		</div>
	</router-link>
</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Muscle, Equipment, Image } from '@/types/index';
// Mixins
import { fetchData } from '@/mixins/fetchData';
import { fetchMuscles } from '@/mixins/fetchMuscles';
import { fetchEquipment } from '@/mixins/fetchEquipment';
import { fetchExerciseImages } from '@/mixins/fetchExerciseImages';
import { fetchImages } from '@/mixins/fetchImages';
import { getCorrectName } from '@/mixins/getCorrectName';
import { getSlug } from '@/mixins/getSlug';

export default defineComponent({
	data () {
		const images: Image[] = [];

		return ({
			images
		});
	},
	props: ['exercise'],
	mixins: [fetchData, fetchMuscles, fetchEquipment, fetchExerciseImages, fetchImages, getCorrectName, getSlug],
	methods: {
		getMuscleName (item: number) {
			const muscle = this.muscles.find((muscle: Muscle) => muscle.id === item);

			if (!muscle) return '';
				else if (muscle.name_en) {
					return muscle.name_en;
				} else return muscle.name;
		},
		getEquipmentName (item: number) {
			const piece = this.equipment.find((piece: Equipment) => piece.id === item);

			if (!piece) return '';
				else return piece.name;
		},
		getLocalImage (folder: string, name: string) {
			return { 'background-image': `url('/images/${folder}/${this.getSlug(name)}.webp')` };
		}
	},
	computed: {
		name () {
			return this.getCorrectName(this.exercise.name);
		},
		slug () {
			return this.exercise.name.toLowerCase().replaceAll(' ', '-');
		}
	},
	async created () {
		this.images = await this.getExerciseImages(this.exercise.exercise_base);
	}
});
</script>

<style scoped lang="scss">
.MyExercise {
	/* Visual */
	border: 2px solid black;
		border-radius: 10px;
	padding: 10px;
	list-style-type: none;

	a {
		color: black;
		text-decoration: none;

		display: flex;
			flex-direction: column;
			gap: 10px;
	}

	h2 {
		margin: 0 auto;
		font-size: 1.5rem;
		text-align: center;
	}

	h3 {
		font-size: 1.25rem;
	}

	hr {
		height: 3px;
		background-color: rgb(66, 103, 178);
		border: none;
	}

	figure {
		img {
			display: flex;
			max-width: 250px;
			max-height: 250px;
			margin: 0 auto;
		}
	}

	.item-group {
		display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 5px;

		ul {
			display: grid;
				grid-template-columns: repeat(3, minmax(0px, auto));
				grid-row-gap: 5px;
			margin: 0 auto;

			li {
				display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

				span {
					display: inline-block;
					background-size: contain;
					background-repeat: no-repeat;
					width: 16px;
					height: 20px;
					content: '';
				}
			}
		}
	}
}
</style>
