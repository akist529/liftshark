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
				<ExercisesToolbar
					:muscles="muscles"
					:equipment="equipment"
				/>
				<LoginBanner
					v-if="!loginStore.token"
				/>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			class="content w-100 ma-0 align-self-stretch"
		>
			<v-col :cols="12">
				<v-container>
					<v-row
						no-gutters
						class="w-100 ma-0 align-self-stretch"
					>
						<v-col :cols="12">
							<v-pagination
								v-if="exercises.isSuccess && exercises.data"
								v-model="exerciseStore.page"
								:length="Math.ceil(exercises.data.count / 20)"
								rounded="circle"
							></v-pagination>
						</v-col>
					</v-row>
					<v-row
						no-gutters
						class="w-100 ma-0 align-self-stretch"
					>
						<v-col
							v-if="error"
							:cols="12"
						>
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
						<v-col
							v-if="(exercises.isLoading || muscles.isLoading || equipment.isLoading) && !error"
							:cols="12"
							class="d-flex justify-center align-center"
						>
							<v-progress-circular
								indeterminate
								:size="70"
								:width="7"
								color="primary"
							></v-progress-circular>
						</v-col>
					</v-row>
					<v-row
						v-if="(exercises.isSuccess && exercises.data && muscles.isSuccess && muscles.data && equipment.isSuccess && equipment.data) && !error"
						class="w-100 ma-0 align-self-stretch"
					>
						<v-col
							v-for="exercise in exercises.data.results"
							:key="exercise.id"
							:xs="12"
							:sm="6"
							:md="4"
							:lg="3"
							:xl="3"
							:xxl="3"
							class="mx-auto d-flex justify-center align-center"
						>
							<ExerciseCard
								:exercise="exercise"
								:muscles="muscles.data.results"
								:equipment="equipment.data.results"
							/>
						</v-col>
					</v-row>
					<v-row
						no-gutters
						class="w-100 ma-0 align-self-stretch"
					>
						<v-col :cols="12">
							<v-pagination
								v-if="exercises.isSuccess && exercises.data"
								v-model="exerciseStore.page"
								:length="Math.ceil(exercises.data.count / 20)"
								:total-visible="7"
								rounded="circle"
							></v-pagination>
						</v-col>
					</v-row>
				</v-container>
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
// Pinia stores
import { useExerciseStore } from '@/stores/exerciseStore';
import { useWindowStore } from '@/stores/windowStore';
import { useLoginStore } from '@/stores/loginStore';
import { useModeStore } from '@/stores/modeStore';
// Local components
import ExerciseCard from '@/components/cards/ExerciseCard.vue';
import LoginBanner from '@/components/banners/LoginBanner.vue';
import ExercisesToolbar from '@/components/toolbars/ExercisesToolbar.vue';
import MyFooter from '@/components/MyFooter.vue';
// Type interfaces
import { ExerciseData, Muscle, Equipment } from '@/types/index';

const getExerciseData = async (page: number, muscle: Muscle | null, equipment: Equipment | null): Promise<ExerciseData> => {
	let url = `https://wger.de/api/v2/exercise/?language=2&limit=20&offset=${(page - 1) * 20}`;

	if (muscle) {
		url = url + `&muscles=${muscle.id}`;
	}

	if (equipment) {
		url = url + `&equipment=${equipment.id}`;
	}

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
		const exercises = useQuery('exercises', () => getExerciseData(exerciseStore.page, exerciseStore.filteredMuscle, exerciseStore.filteredEquipment), { onError: (error) => console.log('ERROR', error) });
		const muscles = useQuery('muscles', () => getData('https://wger.de/api/v2/muscle?limit=999'), { useErrorBoundary: true });
		const equipment = useQuery('equipment', () => getData('https://wger.de/api/v2/equipment?limit=999'), { useErrorBoundary: true });

		return ({
			exerciseStore,
			windowStore: useWindowStore(),
			loginStore: useLoginStore(),
			modeStore: useModeStore(),
			exercises,
			muscles,
			equipment
		});
	},
	watch: {
		'exerciseStore.page' () {
			this.exercises.refetch();
			this.$nextTick(() => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			});
		}
	},
	components: {
		ExerciseCard,
		LoginBanner,
		ExercisesToolbar,
		MyFooter
	},
	computed: {
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
	}
});
</script>

<style scoped>
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
