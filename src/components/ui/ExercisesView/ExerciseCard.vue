<template>
<v-card class="bg-blue-grey rounded pa-3" :style="{height: '500px', overflow: 'scroll'}">
	<v-card-title>
		<h2>{{ name }}</h2>
	</v-card-title>
	<v-card-text v-if="images.isLoading" class="d-flex justify-center align-center">
		<v-progress-circular
			indeterminate
			color="primary"
		></v-progress-circular>
	</v-card-text>
	<v-card-text v-if="images.isError" class="d-flex justify-center align-center">
		<strong>Error!</strong>
	</v-card-text>
	<v-card-text v-if="images.isSuccess && images.data">
		<v-container>
			<v-row>
				<v-col>
					<h3>Primary Muscles</h3>
					<v-divider></v-divider>
					<v-list v-if="exercise.muscles.length">
						<v-list-item v-for="muscle in exercise.muscles" :key="muscle">
							<span :style="getLocalImage('muscles', getSlug(getMuscleName(muscle)))"></span>
							{{ getMuscleName(muscle) }}
						</v-list-item>
					</v-list>
					<span v-else>None</span>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<h3>Secondary Muscles</h3>
					<v-divider></v-divider>
					<v-list v-if="exercise.muscles_secondary.length">
						<v-list-item v-for="muscle in exercise.muscles_secondary" :key="muscle">
							<span :style="getLocalImage('muscles', getSlug(getMuscleName(muscle)))"></span>
							{{ getMuscleName(muscle) }}
						</v-list-item>
					</v-list>
					<span v-else>None</span>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<h3>Equipment</h3>
					<v-divider></v-divider>
					<v-list v-if="exercise.equipment.length">
						<v-list-item v-for="item in exercise.equipment" :key="item">
							<span :style="getLocalImage('equipment', getSlug(getEquipmentName(item)))"></span>
							{{ getEquipmentName(item) }}
						</v-list-item>
					</v-list>
					<span v-else>None</span>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-img
						v-if="images.data.results.length"
						:max-width="250"
						:src="images.data.results[0].image"
						alt="Exercise Image"
					></v-img>
				</v-col>
			</v-row>
		</v-container>
	</v-card-text>
</v-card>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Type interfaces
import { Muscle, Equipment, Exercise, ImageData } from '@/types/index';
// Mixins
import { getCorrectName } from '@/mixins/getCorrectName';
import { getSlug } from '@/mixins/getSlug';

const getImageData = async (base: number): Promise<ImageData> => {
	return await fetch(`https://wger.de/api/v2/exerciseimage/?limit=999&exercise_base=${base}`)
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
	data () {
		const images = useQuery(['images', this.exercise.exercise_base], () => getImageData(this.exercise.exercise_base));

		return ({
			images
		});
	},
	props: {
		exercise: {
			type: Object as PropType<Exercise>,
			required: true
		},
		muscles: {
			type: Object as PropType<Muscle[]>,
			required: true
		},
		equipment: {
			type: Object as PropType<Equipment[]>,
			required: true
		}
	},
	mixins: [getCorrectName, getSlug],
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
		}
	}
});
</script>

<style scoped lang="scss">
.ExerciseCard {
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
						background-position: center;
					width: 16px;
					height: 20px;
					content: '';
				}
			}
		}
	}
}
</style>
