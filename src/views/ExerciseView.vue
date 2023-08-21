<template>
<v-main class="bg-blue-lighten-4">
	<v-container
		fluid
		class="fill-height pa-0"
	>
		<v-row
			no-gutters
			class="ma-0 align-self-start w-100"
		>
			<v-col :cols="12">
				<ExerciseToolbar
					:exercise="exercise"
					:muscles="muscles"
					:equipment="equipment"
					:isLoaded="isLoaded"
					:isError="isError"
				/>
				<LoginBanner v-if="!token" />
			</v-col>
		</v-row>
		<v-row
			v-if="!isLoaded && !isError"
			no-gutters
			class="w-100 ma-0 align-self-stretch"
		>
			<v-col>
				<LoadIcon />
			</v-col>
		</v-row>
		<v-row
			v-else-if="isLoaded && !isError && exercise.data"
			no-gutters
			class="w-100 ma-0 align-self-stretch"
		>
			<v-col
				:cols="12"
				class="pa-3 d-flex flex-wrap justify-center align-flex-start bg-blue-lighten-4"
				:style="{gap: '20px'}"
			>
				<v-card
					class="mx-auto"
					width="400"
				>
					<v-card-title
						class="bg-primary"
					>
						<v-icon
							icon="mdi-arm-flex"
							size="xx-large"
							class="mx-5"
						></v-icon>
						Muscles
					</v-card-title>
					<v-card-text class="pa-2">
						<v-list
							density="compact"
							class="bg-transparent d-flex flex-wrap justify-center align-center"
							disabled
						>
							<v-list-subheader>Primary Muscles</v-list-subheader>
							<v-sheet
								:width="300"
								class="bg-transparent d-flex flex-wrap justify-center align-center"
							>
								<v-list-item
									v-for="(muscle, i) in exercise.data.muscles"
									:key="i"
									:value="getMuscleName(muscle)"
									color="primary"
								>
									<template
										v-slot:prepend
									>
										<span
											:style="getIcon('muscles', getSlug(getMuscleName(muscle)))"
										></span>
									</template>
									<v-list-item-title
										v-text="getMuscleName(muscle)"
									></v-list-item-title>
								</v-list-item>
								<v-list-item
									v-if="!exercise.data.muscles.length"
									color="primary"
									disabled
								>
									<v-list-item-title>None</v-list-item-title>
								</v-list-item>
							</v-sheet>
						</v-list>
						<v-list
							density="compact"
							class="bg-transparent d-flex flex-wrap justify-center align-center"
							disabled
						>
							<v-list-subheader>Secondary Muscles</v-list-subheader>
							<v-sheet :width="300" class="bg-transparent d-flex flex-wrap justify-center align-center">
								<v-list-item
									v-for="(muscle, i) in exercise.data.muscles_secondary"
									:key="i"
									:value="getMuscleName(muscle)"
									color="primary"
								>
									<template
										v-slot:prepend
									>
										<span
											:style="getIcon('muscles', getSlug(getMuscleName(muscle)))"
										></span>
									</template>
									<v-list-item-title
										v-text="getMuscleName(muscle)"
									></v-list-item-title>
								</v-list-item>
								<v-list-item
									v-if="!exercise.data.muscles_secondary.length"
									color="primary"
									disabled
								>
									<v-list-item-title>None</v-list-item-title>
								</v-list-item>
							</v-sheet>
						</v-list>
					</v-card-text>
				</v-card>
				<v-card
					class="mx-auto"
					width="400"
				>
					<v-card-title
						class="bg-primary"
					>
						<v-icon
							icon="mdi-dumbbell"
							size="xx-large"
							class="mx-5"
						></v-icon>
						Equipment
					</v-card-title>
					<v-card-text class="pa-2">
						<v-list
							density="compact"
							class="bg-transparent d-flex flex-wrap justify-center align-center"
							disabled
						>
							<v-sheet :width="300" class="bg-transparent d-flex flex-wrap justify-center align-center">
								<v-list-item
									v-for="(item, i) in exercise.data.equipment"
									:key="i"
									:value="getEquipmentName(item)"
									color="primary"
								>
									<template
										v-slot:prepend
									>
										<span
											:style="getIcon('equipment', getSlug(getEquipmentName(item)))"
										></span>
									</template>
									<v-list-item-title
										v-text="getEquipmentName(item)"
									></v-list-item-title>
								</v-list-item>
								<v-list-item
									v-if="!exercise.data.equipment.length"
									color="primary"
									disabled
								>
									<v-list-item-title>None</v-list-item-title>
								</v-list-item>
							</v-sheet>
						</v-list>
					</v-card-text>
				</v-card>
				<v-card
					class="mx-auto"
					width="400"
				>
					<v-card-title
						class="bg-primary"
					>
						<v-icon
							icon="mdi-information"
							size="xx-large"
							class="mx-5"
						></v-icon>
						Description
					</v-card-title>
					<v-card-text
						class="pa-2"
						:innerHTML="exercise.data.description || '<span>None</span>'"
					></v-card-text>
				</v-card>
				<v-card
					class="mx-auto"
					width="400"
				>
					<v-card-title
						class="bg-primary"
					>
						<v-icon
							icon="mdi-image-area"
							size="xx-large"
							class="mx-5"
						></v-icon>
						Images
					</v-card-title>
					<v-card-text class="pa-2">
						<v-list
							v-if="images.data"
							class="bg-transparent d-flex flex-wrap justify-center align-center"
						>
							<v-list-item
								v-for="image in images.data.results"
								:key="image.id"
							>
								<figure>
									<v-img
										alt="Exercise Example"
										:src="image.image"
										:max-width="250"
									></v-img>
									<figcaption>Example of {{ exercise.data.name }}</figcaption>
								</figure>
							</v-list-item>
							<v-list-item
								v-if="!images.data.results.length"
							>
								<span>No Image Available</span>
							</v-list-item>
						</v-list>
					</v-card-text>
				</v-card>
				<v-card
					class="mx-auto"
					width="400"
				>
					<v-card-title
						class="bg-primary"
					>
						<v-icon
							icon="mdi-medal"
							size="xx-large"
							class="mx-5"
						></v-icon>
						Workout History
					</v-card-title>
					<v-card-text class="pa-2">
						<v-table v-if="records.length">
							<thead>
								<tr>
									<th class="text-left">
										Date
									</th>
									<th class="text-left">
										Record (lbs)
									</th>
									<th class="text-left">
										Record (reps)
									</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="record in records"
									:key="record.id"
								>
									<td>{{ record.date }}</td>
									<td>{{ record.weight }} lbs</td>
									<td>{{ record.reps }} reps</td>
								</tr>
							</tbody>
						</v-table>
						<span v-else class="pa-3">No workout history for this exercise</span>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row
			v-else
			no-gutters
			class="w-100 ma-0 align-self-stretch"
		>
			<v-col>
				<v-alert
					:max-width="650"
					border="start"
					border-color="red-accent-1"
					elevation="2"
					type="error"
					title="Error"
					text="There is an issue communicating with the server. Please try again later."
				></v-alert>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			class="ma-0 align-self-end"
		>
			<v-col :cols="12">
				<MyFooter />
			</v-col>
		</v-row>
	</v-container>
</v-main>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Type interfaces
import { Muscle, Equipment, Category, Exercise } from '@/types/index';
// Local components
import LoadIcon from '@/components/LoadIcon.vue';
import LoginBanner from '@/components/banners/LoginBanner.vue';
import ExerciseToolbar from '@/components/toolbars/ExerciseToolbar.vue';
import MyFooter from '@/components/MyFooter.vue';
// Third-party libraries
import Cookies from 'js-cookie';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';

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
			displayName,
			token: Cookies.get('token'),
			workoutStore: useWorkoutStore()
		});
	},
	components: {
		LoadIcon,
		LoginBanner,
		ExerciseToolbar,
		MyFooter
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
		getIcon (folder: string, name: string) {
			return {
				backgroundImage: `url('/images/${folder}/${this.getSlug(name)}.webp')`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'contain',
				backgroundPosition: 'center',
				content: '',
				width: '32px',
				height: '32px',
				display: 'inline-block',
				marginRight: '8px'
			};
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
		},
		records () {
			const records: any[] = [];

			for (const workout of this.workoutStore.workouts) {
				for (const entry of workout.attributes.entries) {
					if (entry.name === this.exercise.data?.name) {
						const sortedSets = entry.sets.sort((a, b) => {
							return b.weight - a.weight;
						})

						records.push({
							date: workout.attributes.date,
							weight: sortedSets[0].weight,
							reps: sortedSets[0].reps
						});
					}
				}
			}

			return records;
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

<style scoped>
.v-list-item--disabled {
	opacity: 1;
}
</style>
