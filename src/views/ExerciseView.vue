<template>
<LoadIcon v-if="!loaded && !error" />
<h1 v-if="error">Error!</h1>
<div v-if="loaded" class="ExerciseView">
	<h1>{{ exercise.name }}</h1>
	<h2 v-if="exercise.muscles.length">Primary Muscles</h2>
	<ul v-if="exercise.muscles.length">
		<li v-for="muscle in exercise.muscles" :key="muscle">
			<span :style="getImage('muscles', getSlug(getMuscleName(muscle)))"></span>
			{{ getMuscleName(muscle) }}
		</li>
	</ul>
	<h2 v-if="exercise.muscles_secondary.length">Secondary Muscles</h2>
	<ul v-if="exercise.muscles_secondary.length">
		<li v-for="muscle in exercise.muscles_secondary" :key="muscle">
			<span :style="getImage('muscles', getSlug(getMuscleName(muscle)))"></span>
			{{ getMuscleName(muscle) }}
		</li>
	</ul>
	<h2 v-if="exercise.equipment.length">Equipment</h2>
	<ul v-if="exercise.equipment.length">
		<li v-for="item in exercise.equipment" :key="item">
			<span :style="getImage('equipment', getSlug(getEquipmentName(item)))"></span>
			{{ getEquipmentName(item) }}
		</li>
	</ul>
	<p v-if="exercise.description" :innerHTML="exercise.description"></p>
	<ul v-if="images" class="exercise-pics">
		<li v-for="image in images" :key="image.id">
			<figure>
				<img
					alt="Exercise Example"
					:src="image.image" />
				<figcaption>Example of {{ exercise.name }}</figcaption>
			</figure>
		</li>
	</ul>
	<div class="exercise-btns">
		<BackButton
			class="back-btn"
			@click="$router.back()" />
		<div>
			<BurgerButton
				:menuOpen="menuOpen"
				@setMenuOpen="setMenuOpen" />
			<BurgerMenu v-if="menuOpen" />
		</div>
		<BookmarkButton
			class="bookmark-btn" />
	</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchData } from '@/mixins/fetchData';
import { fetchImages } from '@/mixins/fetchImages';
import { Exercise, Muscle, Equipment, Category, Image } from '@/types/index';
// Local components
import BookmarkButton from '@/components/buttons/BookmarkButton.vue';
import BackButton from '@/components/buttons/BackButton.vue';
import BurgerButton from '@/components/buttons/BurgerButton.vue';
import LoadIcon from '@/components/LoadIcon.vue';
import BurgerMenu from '@/components/ui/ExerciseView/BurgerMenu.vue';

export default defineComponent({
	components: {
		BookmarkButton,
		BackButton,
		BurgerButton,
		LoadIcon,
		BurgerMenu
	},
	mixins: [fetchData, fetchImages],
	data () {
		const exercise = {} as Exercise;
		const muscles: Muscle[] = [];
		const equipment: Equipment[] = [];
		const categories: Category[] = [];
		const images: Image[] = [];
		const menuOpen = false;
		const routerName = this.$route.params.id as string;
		const error = false;

		return ({
			exercise,
			muscles,
			equipment,
			categories,
			images,
			loaded: false,
			menuOpen,
			routerName,
			error
		});
	},
	methods: {
		getMuscleName (item: number) {
			const muscle = this.muscles.find((muscle: Muscle) => muscle.id === item);

			if (!muscle) return '';
				else if (muscle.name_en) {
					return muscle.name_en;
				} else return muscle.name;
		},
		getEquipmentName (item: number) {
			const equipment = this.equipment.find((piece: Equipment) => piece.id === item);

			if (!equipment) return '';
				else return equipment.name;
		},
		setMenuOpen () {
			this.menuOpen = !this.menuOpen;
		},
		getSlug (name: string) {
			return name.split(' ').join('-').replaceAll('(', '').replaceAll(')', '').toLowerCase();
		},
		getImage (folder: string, name: string) {
			return { 'background-image': `url('/images/${folder}/${this.getSlug(name)}.webp')` };
		}
	},
	computed: {
		displayName: function () {
			const displayName = this.routerName.split('-').map(word => {
				return word[0].toUpperCase() + word.slice(1);
			}).join(' ');

			return displayName;
		}
	},
	async created () {
		// eslint-disable-next-line no-var
		var exerciseSuccess = false;
		const slug = this.displayName.split(' ').join('+');
		let i = 0;
		console.log(slug);

		await this.getResults(`https://wger.de/api/v2/exercise/?name=${slug}&language=2`, 'name')
				.then(data => {
					if (data && data.length) {
						this.exercise = data[0] as Exercise;
						exerciseSuccess = true;
					}
				}).catch(error => {
					console.log(error);
				});

		if (!exerciseSuccess) {
			const slugArr = slug.split('+');

			for (let i = 1; i < slugArr.length; i++) {
				slugArr[i] = slugArr[i][0].toLowerCase() + slugArr[i].slice(1);
			}

			const newSlug = slugArr.join('+');
			console.log(newSlug);

			await this.getResults(`https://wger.de/api/v2/exercise/?name=${newSlug}&language=2`, 'name')
				.then(data => {
					if (data && data.length) {
						this.exercise = data[0] as Exercise;
						exerciseSuccess = true;
					}
				}).catch(error => {
					console.log(error);
				});
		}

		if (!exerciseSuccess) {
			i = 0;

			do {
				const slugArr = slug.split('');

				if (slugArr[i] === slug.charAt(i).toUpperCase()) {
					slugArr[i] = slug.charAt(i).toLowerCase();
				} else {
					slugArr[i] = slug.charAt(i).toUpperCase();
				}

				if (slugArr[i] === '+') {
					slugArr[i] = '-';
				}

				const newSlug = slugArr.join('');
				console.log(newSlug);

				await this.getResults(`https://wger.de/api/v2/exercise/?name=${newSlug}&language=2`, 'name')
					.then(data => {
						if (data && data.length) {
							this.exercise = data[0] as Exercise;
							exerciseSuccess = true;
						}
					}).catch(error => {
						console.log(error);
					});

				i++;
			} while (!exerciseSuccess && i < slug.length);
		}

		if (!exerciseSuccess) {
			i = 0;

			do {
				const slugArr = slug.toLowerCase().split('');

				if (slugArr[i] === slug.charAt(i).toUpperCase()) {
					slugArr[i] = slug.charAt(i).toLowerCase();
				} else {
					slugArr[i] = slug.charAt(i).toUpperCase();
				}

				if (slugArr[i] === '+') {
					slugArr[i] = '-';
				}

				const newSlug = slugArr.join('');
				console.log(newSlug);

				await this.getResults(`https://wger.de/api/v2/exercise/?name=${newSlug}&language=2`, 'name')
					.then(data => {
						if (data && data.length) {
							this.exercise = data[0] as Exercise;
							exerciseSuccess = true;
						}
					}).catch(error => {
						console.log(error);
					});

				i++;
			} while (!exerciseSuccess && i < slug.length);
		}

		if (this.exercise === undefined) {
			this.error = true;
			return;
		}

		await this.getResults('https://wger.de/api/v2/muscle?limit=999', 'name')
			.then(data => {
				if (data) this.muscles = data;
					else this.error = true;
			});

		await this.getResults('https://wger.de/api/v2/equipment?limit=999', 'name')
			.then(data => {
				if (data) this.equipment = data;
					else this.error = true;
			});

		// eslint-disable-next-line
		await this.getResults(`https://wger.de/api/v2/exerciseimage/?limit=999&exercise_base=${this.exercise.exercise_base}`, 'id')
			.then(data => {
				if (data) {
					const filteredData = data.filter(image => image.exercise_base === this.exercise.exercise_base);

					for (const image of filteredData) {
						this.images.push(image);
					}
				} else this.error = true;
			});

		if (!this.error) this.loaded = true;
	}
});
</script>

<style scoped lang="scss">
.ExerciseView {
	/* Positioning */
	display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 10px;
	position: relative;
	width: 100%;
	height: calc(100vh - 120px);
		min-height: calc(100vh - 120px);
	overflow: scroll;

	/* Visual */
	padding: 10px;
	font-family: var(--content-font);

	h1 {
		font-family: var(--title-font);
		font-weight: 700;
		font-size: 6vw;
		text-align: center;
		text-transform: uppercase;
	}

	h2 {
		font-weight: 500;
		text-align: center;
	}

	ul {
		/* Positioning */
		display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			gap: 10px;

		/* Visual */
		list-style-type: none;
		font-weight: 300;

		li {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			span {
				display: inline-block;
				background-size: contain;
				background-repeat: no-repeat;
				width: 32px;
				height: 40px;
				content: '';
			}
		}
	}

	.add-buttons {
		display: flex;
			justify-content: space-evenly;
		width: 100%;
	}

	.exercise-pics {
		/* Positioning */
		display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

		/* Visual */
		list-style-type: none;

		li {
			img {
				max-width: 250px;
			}
		}
	}

	.exercise-btns {
		display: flex;
			justify-content: space-evenly;
			align-items: flex-end;

		img {
			filter: invert(1);
			width: 40px;
		}
	}

	.abs {
		display: inline-block;
		background-image: url('/public/images/ui/exercises/abs.webp');
		background-size: contain;
		background-repeat: no-repeat;
		width: 32px;
		height: 32px;
		content: '';
	}
}
</style>
