<template>
<main
	class="ExercisesView"
	ref="view"
>
	<v-toolbar
		color="primary"
		extended
		extension-height="auto"
	>
		<v-toolbar-title
			class="flex align-center text-center"
		>
			<v-icon
				icon="mdi-dumbbell"
			></v-icon>
			My Exercises
		</v-toolbar-title>
		<template
			v-slot:extension
		>
			<v-sheet
				v-if="windowStore.isDesktop"
				class="w-100 bg-primary d-flex flex-column justify-space-evenly align-center pa-3"
			>
				<label>Filter by Muscle</label>
				<v-chip-group
					v-if="muscles.isSuccess && muscles.data"
				>
					<v-chip
						v-for="(muscle, index) in (muscles.data.results as Muscle[])"
						:key="index"
						label
						filter
						@click="filterMuscle(muscle)"
					>{{ muscle.name_en ? muscle.name_en : muscle.name }}</v-chip>
				</v-chip-group>
				<label>Filter by Equipment</label>
				<v-chip-group
					v-if="equipment.isSuccess && equipment.data"
				>
					<v-chip
						v-for="(item, index) in (equipment.data.results as Equipment[])"
						:key="index"
						label
						filter
						@click="filterEquipment(item)"
					>{{ item.name }}</v-chip>
				</v-chip-group>
			</v-sheet>
			<v-sheet
				v-if="!windowStore.isDesktop"
				class="bg-primary d-flex flex-column justify-center align-center w-100"
			>
				<v-select
					v-if="muscles.isSuccess && muscles.data"
					v-model="exerciseStore.filteredMuscle"
					label="Filter by Muscle"
					:items="muscles.data.results"
					item-title="name"
					return-object
					class="w-75"
				></v-select>
				<v-select
					v-if="equipment.isSuccess && equipment.data"
					v-model="exerciseStore.filteredEquipment"
					label="Filter by Equipment"
					:items="equipment.data.results"
					item-title="name"
					return-object
					class="w-75"
				></v-select>
			</v-sheet>
		</template>
	</v-toolbar>
	<LoginBanner
		v-if="!token"
	/>
	<v-pagination
		v-if="exercises.isSuccess && exercises.data"
		v-model="exerciseStore.page"
		:length="Math.ceil(exercises.data.count / 20)"
		rounded="circle"
	></v-pagination>
	<v-container>
		<v-row
			v-if="error"
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
			v-if="(exercises.isLoading || muscles.isLoading || equipment.isLoading) && !error"
		>
			<v-col>
				<LoadIcon />
			</v-col>
		</v-row>
		<v-row
			v-if="(exercises.isSuccess && exercises.data && muscles.isSuccess && muscles.data && equipment.isSuccess && equipment.data) && !error"
		>
			<v-col>
				<v-container>
					<v-row>
						<v-col
							v-for="exercise in exercises.data.results"
							:key="exercise.id"
							:cols="cols"
						>
							<ExerciseCard
								:exercise="exercise"
								:muscles="muscles.data.results"
								:equipment="equipment.data.results" />
						</v-col>
					</v-row>
				</v-container>
			</v-col>
		</v-row>
	</v-container>
	<v-pagination
		v-if="exercises.isSuccess && exercises.data"
		v-model="exerciseStore.page"
		:length="Math.ceil(exercises.data.count / 20)"
		:total-visible="7"
		rounded="circle"
	></v-pagination>
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
import { useWindowStore } from '@/stores/windowStore';
// Local components
import ExerciseCard from '@/components/ui/ExercisesView/ExerciseCard.vue';
import LoadIcon from '@/components/LoadIcon.vue';
import MyFooter from '@/components/MyFooter.vue';
import LoginBanner from '@/components/banners/LoginBanner.vue';
// Type interfaces
import { ExerciseData, Muscle, Equipment } from '@/types/index';
// Third-party libraries
import Cookies from 'js-cookie';

const getExerciseData = async (page: number, muscle: Muscle | null, equipment: Equipment | null): Promise<ExerciseData> => {
	let url = `https://wger.de/api/v2/exercise/?language=2&limit=20&offset=${(page - 1) * 20}`;

	if (muscle) {
		url = url + `&muscles=${muscle.id}`;
	}

	if (equipment) {
		url = url + `&equipment=${equipment.id}`;
	}

	console.log(url);

	return await fetch(url)
		.then(res => res.json())
		.catch(err => console.log(err));
}

const getData = async (url: string): Promise<any> => {
	return await fetch(url)
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
	data () {
		const exerciseStore = useExerciseStore();
		const windowStore = useWindowStore();

		const exercises = useQuery(['exercises', exerciseStore], () => getExerciseData(exerciseStore.page, exerciseStore.filteredMuscle, exerciseStore.filteredEquipment), { onError: (error) => console.log('ERROR', error) });
		const muscles = useQuery('muscles', () => getData('https://wger.de/api/v2/muscle?limit=999'), { useErrorBoundary: true });
		const equipment = useQuery('equipment', () => getData('https://wger.de/api/v2/equipment?limit=999'), { useErrorBoundary: true });

		return ({
			exerciseStore,
			windowStore,
			exercises,
			muscles,
			equipment,
			token: Cookies.get('token')
		});
	},
	watch: {
		exerciseStore: {
			deep: true,
			handler () {
				this.exercises.refetch();
				(this.$refs.view as HTMLDivElement).scrollTo({ top: 0, behavior: 'smooth' });
			}
		}
	},
	components: {
		ExerciseCard,
		LoadIcon,
		MyFooter,
		LoginBanner
	},
	computed: {
		cols () {
			if (this.windowStore.width < 800) {
				return 12;
			} else if (this.windowStore.width < 992) {
				return 6;
			} else {
				return 4;
			}
		},
		error () {
			if (this.exercises.error ||
			this.exercises.isError ||
			this.exercises.isLoadingError ||
			(this.exercises.isSuccess && !this.exercises.data) ||
			this.muscles.error ||
			this.muscles.isError ||
			this.muscles.isLoadingError ||
			(this.muscles.isSuccess && !this.muscles.data) ||
			this.equipment.error ||
			this.equipment.isError ||
			this.equipment.isLoadingError ||
			(this.equipment.isSuccess && !this.equipment.data) ||
			(!this.exercises.isLoading && !this.exercises.isSuccess) ||
			(!this.muscles.isLoading && !this.muscles.isSuccess) ||
			(!this.equipment.isLoading && !this.equipment.isSuccess)) {
				return true;
			} else {
				return false;
			}
		}
	},
	methods: {
		filterMuscle (muscle: Muscle) {
			if (this.exerciseStore.filteredMuscle?.id === muscle.id) {
				this.exerciseStore.filteredMuscle = null;
			} else {
				this.exerciseStore.filteredMuscle = muscle;
			}
		},
		filterEquipment (item: Equipment) {
			if (this.exerciseStore.filteredEquipment?.id === item.id) {
				this.exerciseStore.filteredEquipment = null;
			} else {
				this.exerciseStore.filteredEquipment = item;
			}
		}
	}
});
</script>

<style scoped lang="scss">
.ExercisesView {
	/* Visual */
	font-family: var(--content-font);
}
</style>
