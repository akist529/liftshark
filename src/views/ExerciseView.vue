<template>
<main>
	<LoadIcon v-if="!isLoaded && !isError" />
	<h1 v-if="isError">Error!</h1>
	<article v-if="isLoaded && !isError && exercise.data && muscles.data && equipment.data" class="ExerciseView">
		<h1>{{ exercise.data.name }}</h1>
		<h2 v-if="exercise.data.muscles.length">Primary Muscles</h2>
		<ul v-if="exercise.data.muscles.length">
			<li v-for="muscle in exercise.data.muscles" :key="muscle">
				<span
					:style="getLocalImage('muscles', getSlug(getMuscleName(muscle)))"
				></span>
				{{ getMuscleName(muscle) }}
			</li>
		</ul>
		<h2 v-if="exercise.data.muscles_secondary.length">Secondary Muscles</h2>
		<ul v-if="exercise.data.muscles_secondary.length">
			<li v-for="muscle in exercise.data.muscles_secondary" :key="muscle">
				<span
					:style="getLocalImage('muscles', getSlug(getMuscleName(muscle)))"
				></span>
				{{ getMuscleName(muscle) }}
			</li>
		</ul>
		<h2 v-if="exercise.data.equipment.length">Equipment</h2>
		<ul v-if="exercise.data.equipment.length">
			<li v-for="item in exercise.data.equipment" :key="item">
				<span
					:style="getLocalImage('equipment', getSlug(getEquipmentName(item)))"
				></span>
				{{ getEquipmentName(item) }}
			</li>
		</ul>
		<p v-if="exercise.data.description" :innerHTML="exercise.data.description"></p>
		<ul v-if="images.isSuccess && images.data.results.length" class="exercise-pics">
			<li v-for="image in images.data.results" :key="image.id">
				<figure>
					<img
						alt="Exercise Example"
						:src="image.image" />
					<figcaption>Example of {{ exercise.data.name }}</figcaption>
				</figure>
			</li>
		</ul>
		<BurgerMenu v-if="menuOpen" />
		<footer>
			<BackButton
				class="back-btn"
				@click="$router.back()" />
			<div class="burger-column">
				<BurgerButton
					:menuOpen="menuOpen"
					@setMenuOpen="setMenuOpen" />
			</div>
			<BookmarkButton
				class="bookmark-btn"
				:id="exercise.data.id" />
		</footer>
	</article>
</main>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Type interfaces
import { Muscle, Equipment, Category, Exercise } from '@/types/index';
// Local components
import BookmarkButton from '@/components/buttons/BookmarkButton.vue';
import BackButton from '@/components/buttons/BackButton.vue';
import BurgerButton from '@/components/buttons/BurgerButton.vue';
import LoadIcon from '@/components/LoadIcon.vue';
import BurgerMenu from '@/components/ui/ExerciseView/BurgerMenu.vue';

const getData = async (url: string): Promise<any> => {
	return await fetch(url)
		.then(res => res.json())
		.catch(err => console.log(err));
}

const getExerciseData = async (slug: string): Promise<Exercise | undefined> => {
	let slugArr = slug.split('-');

	for (let i = 0; i < slugArr.length; i++) {
		slugArr[i] = slugArr[i][0].toUpperCase() + slugArr[i].slice(1);
	}

	let newSlug = slugArr.join('+');

	// Attempt to fetch exercise data with default slug (all first letters uppercase)
	let exercise = await fetch(`https://wger.de/api/v2/exercise/?name=${newSlug}&language=2`)
		.then(res => res.json())
		.then(data => data.results[0])
		.catch(err => console.log(err));

	if (exercise) return exercise;

	// Attempt to fetch exercise data with lowercase slug (all first letters lowercase)
	slugArr = slug.split('-');

	for (let i = 1; i < slugArr.length; i++) {
		slugArr[i] = slugArr[i][0].toLowerCase() + slugArr[i].slice(1);
	}

	newSlug = slugArr.join('+');

	exercise = await fetch(`https://wger.de/api/v2/exercise/?name=${newSlug}&language=2`)
		.then(res => res.json())
		.then(data => data.results[0])
		.catch(err => console.log(err));

	if (exercise) return exercise;

	// Attempt to fetch exercise data by changing case for each first letter of each word
	for (let i = 0; i < slugArr.length; i++) {
		slugArr = slug.split('-');

		for (let i = 0; i < slugArr.length; i++) {
			slugArr[i] = slugArr[i][0].toUpperCase() + slugArr[i].slice(1);
		}

		slugArr[i] = slugArr[i][0].toLowerCase() + slugArr[i].slice(1);
		newSlug = slugArr.join('+');

		exercise = await fetch(`https://wger.de/api/v2/exercise/?name=${newSlug}&language=2`)
			.then(res => res.json())
			.then(data => data.results[0])
			.catch(err => console.log(err));

		if (exercise) return exercise;
	}

	// Attempt to fetch exercise data by turning each letter to opposite case
	for (let i = 0; i < slug.length; i++) {
		const slugArr = slug.replaceAll('-', '+').split('');

		if (slugArr[i] === slug.charAt(i).toUpperCase()) {
			slugArr[i] = slug.charAt(i).toLowerCase();
		} else {
			slugArr[i] = slug.charAt(i).toUpperCase();
		}

		if (slugArr[i] === '+') slugArr[i] = '-';
		newSlug = slugArr.join('');

		exercise = await fetch(`https://wger.de/api/v2/exercise/?name=${newSlug}&language=2`)
			.then(res => res.json())
			.then(data => data.results[0])
			.catch(err => console.log(err));

		if (exercise) return exercise;
	}

	// Attempt to fetch exercise data by turning each letter of lowercase string to opposite case
	for (let i = 0; i < slug.length; i++) {
		const slugArr = slug.toLowerCase().replaceAll('-', '+').split('');

		if (slugArr[i] === slug.charAt(i).toUpperCase()) {
			slugArr[i] = slug.charAt(i).toLowerCase();
		} else {
			slugArr[i] = slug.charAt(i).toUpperCase();
		}

		if (slugArr[i] === '+') slugArr[i] = '-';
		newSlug = slugArr.join('');

		exercise = await fetch(`https://wger.de/api/v2/exercise/?name=${newSlug}&language=2`)
			.then(res => res.json())
			.then(data => data.results[0])
			.catch(err => console.log(err));

		if (exercise) return exercise;
	}
}

export default defineComponent({
	data () {
		const exercise = useQuery('exercise', () => getExerciseData(this.$route.params.id as string));
		const muscles = useQuery('muscles', () => getData('https://wger.de/api/v2/muscle?limit=999'));
		const equipment = useQuery('equipment', () => getData('https://wger.de/api/v2/equipment?limit=999'));
		const images = useQuery(['images', this.exerciseBase], () => getData(`https://wger.de/api/v2/exerciseimage/?limit=999&exercise_base=${this.exerciseBase}`), { enabled: false });
		const displayName = (this.$route.params.id as string).split('-').map(word => {
				return word[0].toUpperCase() + word.slice(1);
			}).join(' ');

		return ({
			exercise,
			muscles,
			equipment,
			images,
			categories: [] as Category[],
			menuOpen: false,
			routerName: this.$route.params.id as string,
			exerciseBase: 0,
			error: true,
			displayName
		});
	},
	components: {
		BookmarkButton,
		BackButton,
		BurgerButton,
		LoadIcon,
		BurgerMenu
	},
	methods: {
		getMuscleName (item: number) {
			const muscle = this.muscles.data.results.find((muscle: Muscle) => muscle.id === item);

			if (!muscle) return '';
				else if (muscle.name_en) {
					return muscle.name_en;
				} else return muscle.name;
		},
		getEquipmentName (item: number) {
			const equipment = this.equipment.data.results.find((piece: Equipment) => piece.id === item);

			if (!equipment) return '';
				else return equipment.name;
		},
		setMenuOpen () {
			this.menuOpen = !this.menuOpen;
		},
		getSlug (name: string) {
			return name.split(' ').join('-').replaceAll('(', '').replaceAll(')', '').toLowerCase();
		},
		getLocalImage (folder: string, name: string) {
			return { 'background-image': `url('/images/${folder}/${this.getSlug(name)}.webp')` };
		}
	},
	computed: {
		isLoaded () {
			if (this.exercise.isLoading || this.muscles.isLoading || this.equipment.isLoading) {
				return false;
			} else return true;
		},
		isError () {
			if (this.exercise.isError || this.muscles.isError || this.equipment.isError) {
				return true;
			} else return false;
		}
	},
	watch: {
		exercise: {
			deep: true,
			handler () {
				if (this.exercise.isSuccess && this.exercise.data) {
					this.exerciseBase = this.exercise.data.exercise_base || 0;
					this.images.refetch();
				}
			}
		}
	},
	beforeMount () {
		document.title = `${this.displayName} - Gym Tracker`;
	}
});
</script>

<style scoped lang="scss">
.ExerciseView {
	/* Positioning */
	display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 10px;
	position: relative;
	width: 100%;
	height: calc(100vh - 120px);
		min-height: calc(100vh - 120px);
	overflow: scroll;

	/* Visual */
	padding: 10px;
		padding-bottom: 100px;
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
					background-position: center;
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
		/* Positioning */
		display: flex;
			justify-content: space-between;
		position: fixed;
			left: 0;
			right: 0;
			bottom: 70px;

		/* Visual */
		padding: 10px;

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
			background-position: center;
		width: 32px;
		height: 32px;
		content: '';
	}
}
</style>
