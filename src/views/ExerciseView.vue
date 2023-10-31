<template>
<v-main
	:class="modeStore.darkMode ? 'bg-grey-darken-4' : 'bg-blue-lighten-4'"
>
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
				<LoginBanner v-if="!loginStore.token" />
			</v-col>
		</v-row>
		<v-row
			no-gutters
			class="w-100 ma-0 align-self-stretch"
		>
			<v-col
				:cols="12"
				class="content pa-3 d-flex flex-wrap justify-center align-flex-start"
				:style="{gap: '20px'}"
			>
				<v-card
					class="mx-auto"
					width="400"
				>
					<v-card-title
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-3' : 'bg-blue-lighten-2'"
					>
						<v-icon
							icon="mdi-arm-flex"
							size="xx-large"
							class="mx-5"
						></v-icon>
						Muscles
					</v-card-title>
					<v-card-text
						v-if="exercise.isLoading || muscles.isLoading || exercise.isFetching || muscles.isFetching"
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-1 pa-2 h-100' : 'bg-blue-lighten-3 pa-2 h-100'"
					>
						<VSkeletonLoader
							type="paragraph"
							color="transparent"
						></VSkeletonLoader>
					</v-card-text>
					<v-card-text
						v-else-if="exercise.isSuccess && muscles.isSuccess && exercise.data && muscles.data"
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-1 pa-2 h-100' : 'bg-blue-lighten-3 pa-2 h-100'"
					>
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
											:style="getIcon('muscles', getSlug(getMuscleName(muscle).split(' ')[0]))"
										></span>
									</template>
									<v-list-item-title
										v-text="getMuscleName(muscle).split(' ')[0]"
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
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-3' : 'bg-blue-lighten-2'"
					>
						<v-icon
							icon="mdi-dumbbell"
							size="xx-large"
							class="mx-5"
						></v-icon>
						Equipment
					</v-card-title>
					<v-card-text
						v-if="exercise.isLoading || equipment.isLoading || exercise.isFetching || equipment.isFetching"
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-1 pa-2 h-100' : 'bg-blue-lighten-3 pa-2 h-100'"
					>
						<VSkeletonLoader
							type="paragraph"
							color="transparent"
						></VSkeletonLoader>
					</v-card-text>
					<v-card-text
						v-else-if="exercise.isSuccess && equipment.isSuccess && exercise.data && equipment.data"
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-1 pa-2 h-100' : 'bg-blue-lighten-3 pa-2 h-100'"
					>
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
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-3' : 'bg-blue-lighten-2'"
					>
						<v-icon
							icon="mdi-information"
							size="xx-large"
							class="mx-5"
						></v-icon>
						Description
					</v-card-title>
					<v-card-text
						v-if="exercise.isLoading || exercise.isFetching"
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-1 pa-2 h-100' : 'bg-blue-lighten-3 pa-2 h-100'"
					>
						<VSkeletonLoader
							type="paragraph"
							color="transparent"
						></VSkeletonLoader>
					</v-card-text>
					<v-card-text
						v-else-if="exercise.isSuccess && exercise.data"
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-1 pa-2 h-100' : 'bg-blue-lighten-3 pa-2 h-100'"
						:innerHTML="exercise.data.description || '<span>None</span>'"
					></v-card-text>
				</v-card>
				<v-card
					class="mx-auto"
					width="400"
				>
					<v-card-title
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-3' : 'bg-blue-lighten-2'"
					>
						<v-icon
							icon="mdi-image-area"
							size="xx-large"
							class="mx-5"
						></v-icon>
						Images
					</v-card-title>
					<v-card-text
						v-if="exercise.isLoading || images.isLoading || exercise.isFetching || images.isFetching"
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-1 pa-2 h-100' : 'bg-blue-lighten-3 pa-2 h-100'"
					>
						<VSkeletonLoader
							type="paragraph"
							color="transparent"
						></VSkeletonLoader>
					</v-card-text>
					<v-card-text
						v-else-if="exercise.isSuccess && images.isSuccess && exercise.data && images.data"
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-1 pa-2 h-100' : 'bg-blue-lighten-3 pa-2 h-100'"
					>
						<v-carousel
							v-if="images.data && images.data.results.length"
							class="bg-white"
						>
							<v-carousel-item
								v-for="image in images.data.results"
								:key="image.id"
								class="h-100"
							>
								<v-img
									alt="Exercise Example"
									:src="image.image"
									:max-width="250"
									class="mx-auto h-100"
								></v-img>
							</v-carousel-item>
						</v-carousel>
						<span
							v-if="!images.data || !images.data.results.length"
						>No Images Available</span>
					</v-card-text>
				</v-card>
				<v-card
					class="mx-auto"
					width="400"
				>
					<v-card-title
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-3' : 'bg-blue-lighten-2'"
					>
						<v-icon
							icon="mdi-weight-lifter"
							size="xx-large"
							class="mx-5"
						></v-icon>
						Workout History
					</v-card-title>
					<v-card-text
						v-if="exercise.isLoading || exercise.isFetching"
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-1 pa-2 h-100' : 'bg-blue-lighten-3 pa-2 h-100'"
					>
						<VSkeletonLoader
							type="paragraph"
							color="transparent"
						></VSkeletonLoader>
					</v-card-text>
					<v-card-text
						v-else-if="exercise.isSuccess && exercise.data"
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-1 pa-2 h-100' : 'bg-blue-lighten-3 pa-2 h-100'"
					>
						<v-table
							v-if="workouts.length"
							:class="modeStore.darkMode ? 'bg-blue-grey-darken-4 text-white' : 'bg-blue-grey-lighten-4 text-black'"
						>
							<thead>
								<tr>
									<th
										:class="modeStore.darkMode ? 'text-white' : 'text-black'"
									>
										Date
									</th>
									<th
										:class="modeStore.darkMode ? 'text-white' : 'text-black'"
									>
										Record (lbs)
									</th>
									<th
										:class="modeStore.darkMode ? 'text-white' : 'text-black'"
									>
										Record (reps)
									</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="workout in workouts"
									:key="workout.id"
								>
									<td>{{ workout.date }}</td>
									<td>{{ workout.weight }} lbs</td>
									<td>{{ workout.reps }} reps</td>
								</tr>
							</tbody>
						</v-table>
						<span
							v-else
							class="pa-3"
						>No workout history for this exercise</span>
					</v-card-text>
				</v-card>
				<v-card
					class="mx-auto"
					:width="400"
				>
					<v-card-title
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-3' : 'bg-blue-lighten-2'"
					>
						<v-icon
							icon="mdi-medal"
							size="xx-large"
							class="mx-5"
						></v-icon>
						1-Rep Max
					</v-card-title>
					<v-card-text
						v-if="exercise.isLoading || exercise.isFetching"
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-1 pa-2 h-100' : 'bg-blue-lighten-3 pa-2 h-100'"
					>
						<VSkeletonLoader
							type="paragraph"
							color="transparent"
						></VSkeletonLoader>
					</v-card-text>
					<v-card-text
						v-else-if="exercise.isSuccess && exercise.data"
						:class="modeStore.darkMode ? 'bg-blue-grey-darken-1 pa-2 h-100' : 'bg-blue-lighten-3 pa-2 h-100'"
					>
						<v-table
							v-if="statStore.records.length"
							:class="modeStore.darkMode ? 'bg-blue-grey-darken-4 text-white' : 'bg-blue-grey-lighten-4 text-black'"
						>
							<thead>
								<tr>
									<th
										:class="modeStore.darkMode ? 'text-white' : 'text-black'"
									>
										Date
									</th>
									<th
										:class="modeStore.darkMode ? 'text-white' : 'text-black'"
									>
										Max (lbs)
									</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="record in statStore.records"
									:key="record.id"
								>
									<td>{{ record.attributes.date }}</td>
									<td>{{ record.attributes.max }} lbs</td>
								</tr>
							</tbody>
						</v-table>
						<span
							v-else
							class="pa-3"
						>No 1-rep max logged for this exercise</span>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row
			v-if="isError"
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
// Vuetify imports
import { VSkeletonLoader } from 'vuetify/lib/labs/components.mjs';
// Type interfaces
import { Muscle, Equipment, Category, Exercise, RecordData } from '@/types/index';
// Local components
import LoginBanner from '@/components/banners/LoginBanner.vue';
import ExerciseToolbar from '@/components/toolbars/ExerciseToolbar.vue';
import MyFooter from '@/components/MyFooter.vue';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useLoginStore } from '@/stores/loginStore';
import { useStatStore } from '@/stores/statStore';
import { useModeStore } from '@/stores/modeStore';
import { useExerciseStore } from '@/stores/exerciseStore';

const getData = async (url: string): Promise<any> => {
	return await fetch(url)
		.then(res => res.json())
		.catch(err => {
			console.log(err);
			throw new Error('Error retrieving data!');
		});
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
		.catch(err => {
			console.log(err);
			throw new Error('Error retrieving data!');
		});

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
		.catch(err => {
			console.log(err);
			throw new Error('Error retrieving data!');
		});

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
			.catch(err => {
				console.log(err);
				throw new Error('Error retrieving data!');
			});

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
			.catch(err => {
				console.log(err);
				throw new Error('Error retrieving data!');
			});

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
			.catch(err => {
				console.log(err);
				throw new Error('Error retrieving data!');
			});

		if (exercise) return exercise;
	}
}

export default defineComponent({
	data () {
		// Vue Queries
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
			loading: true,
			displayName,
			workoutStore: useWorkoutStore(),
			loginStore: useLoginStore(),
			statStore: useStatStore(),
			modeStore: useModeStore(),
			exerciseStore: useExerciseStore()
		});
	},
	components: {
		LoginBanner,
		ExerciseToolbar,
		MyFooter,
		VSkeletonLoader
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
				marginRight: '8px',
				filter: this.modeStore.darkMode ? 'invert(1)' : ''
			};
		}
	},
	computed: {
		isLoaded () {
			if (this.exercise.isLoading || this.muscles.isLoading || this.equipment.isLoading || this.images.isLoading) {
				return false;
			} else return true;
		},
		isError () {
			if (this.exercise.isError || this.muscles.isError || this.equipment.isError || this.images.isError) {
				return true;
			} else return false;
		},
		workouts () {
			const workouts: any[] = [];

			for (const workout of this.workoutStore.workouts) {
				for (const entry of workout.attributes.entries) {
					if (entry.name === this.exercise.data?.name) {
						const sortedSets = entry.sets.sort((a, b) => {
							return b.weight - a.weight;
						})

						workouts.push({
							date: workout.attributes.date,
							weight: sortedSets[0].weight,
							reps: sortedSets[0].reps
						});
					}
				}
			}

			return workouts;
		},
		records (): RecordData[] {
			if (this.exercise.data) {
				return this.statStore.records.filter(record => record.attributes.exercise === this.exercise.data?.exercise_base);
			} else {
				return [];
			}
		}
	},
	watch: {
		exercise: {
			deep: true,
			handler () {
				if (this.exercise.isSuccess && this.exercise.data) {
					this.exerciseStore.exercise = this.exercise.data;
					this.exerciseBase = this.exercise.data.exercise_base || 0;
					this.images.refetch();
				}
			}
		}
	},
	beforeMount () {
		document.title = `${this.displayName} - Lift Shark`;
	}
});
</script>

<style scoped>
.v-list-item--disabled {
	opacity: 1;
}

.content {
	background-image: url('/public/images/ui/shark-bg.webp');
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: scroll;
}

@media only screen and (min-width: 600px) {
	.content {
		background-size: contain;
	}
}
</style>
