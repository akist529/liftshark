<template>
<v-card class="d-flex flex-column justify-center align-center bg-blue-grey-darken-4" max-width="400">
	<v-card-item class="d-flex justify-center align-center w-100 text-white bg-primary" height="200">
		<v-card-title>{{ name }}</v-card-title>
	</v-card-item>
	<v-card-actions v-if="images.isLoading" class="d-flex justify-center align-center pa-3">
		<v-progress-circular
			indeterminate
			color="primary"
		></v-progress-circular>
	</v-card-actions>
	<v-card-text v-if="images.isError" class="d-flex justify-center align-center">
		<strong>Error!</strong>
	</v-card-text>
	<v-sheet :height="200" width="100%" class="d-flex justify-center align-center bg-light-blue-lighten-4 pa-2">
		<v-img
			v-if="images.data && images.data.results.length"
			max-width="100%"
			height="100%"
			:src="images.data.results[0].image"
			alt="Exercise Image"
		></v-img>
		<span v-else>NO IMAGE AVAILABLE</span>
	</v-sheet>
	<v-card-text v-if="images.isSuccess && images.data" class="w-100">
		<v-card-subtitle>Primary Muscles</v-card-subtitle>
		<v-divider></v-divider>
		<v-sheet class="d-flex justify-center align-center bg-blue-grey-darken-3 w-100 pa-2" :height="48">
			<v-slide-group class="d-flex justify-center align-center w-100" v-if="exercise.muscles.length" show-arrows>
				<v-slide-group-item v-for="muscle in exercise.muscles" :key="muscle">
					<span
						:style="getLocalImage('muscles', getSlug(getMuscleName(muscle)))"
					></span>
					<span :style="{fontSize: '24px'}">{{ getMuscleName(muscle) }}</span>
				</v-slide-group-item>
			</v-slide-group>
			<span v-else :style="{fontSize: '24px'}">None</span>
		</v-sheet>
		<v-card-subtitle>Secondary Muscles</v-card-subtitle>
		<v-divider></v-divider>
		<v-sheet class="d-flex justify-center align-center bg-blue-grey-darken-3 w-100 pa-2" :height="48">
			<v-slide-group class="d-flex justify-center align-center w-100" v-if="exercise.muscles_secondary.length" show-arrows>
				<v-slide-group-item v-for="muscle in exercise.muscles_secondary" :key="muscle">
					<span
						:style="getLocalImage('muscles', getSlug(getMuscleName(muscle)))"
					></span>
					<span :style="{fontSize: '24px'}">{{ getMuscleName(muscle) }}</span>
				</v-slide-group-item>
			</v-slide-group>
			<span v-else :style="{fontSize: '24px'}">None</span>
		</v-sheet>
		<v-card-subtitle>Equipment</v-card-subtitle>
		<v-divider></v-divider>
		<v-sheet class="d-flex justify-center align-center bg-blue-grey-darken-3 w-100 pa-2" :height="48">
			<v-slide-group class="d-flex justify-center align-center w-100" v-if="exercise.equipment.length" show-arrows>
				<v-slide-group-item v-for="item in exercise.equipment" :key="item">
					<span
						:style="getLocalImage('equipment', getSlug(getEquipmentName(item)))"
					></span>
					<span :style="{fontSize: '24px'}">{{ getEquipmentName(item) }}</span>
				</v-slide-group-item>
			</v-slide-group>
			<span v-else :style="{fontSize: '24px'}">None</span>
		</v-sheet>
	</v-card-text>
	<router-link class="w-100" :to="{ name: 'Exercise - Gym Tracker', params: { id: exercise.name.toLowerCase().replaceAll(' ', '-') } }">
		<v-card-actions class="d-flex justify-center align-center bg-indigo"
		>SEE MORE</v-card-actions>
	</router-link>
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
			return ({
				backgroundImage: `url('/images/${folder}/${this.getSlug(name)}.webp')`,
				backgroundSize: 'contain',
				backgroundPosition: 'center',
				width: '32px',
				height: '32px',
				display: 'inline-block'
			});
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
