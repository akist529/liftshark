<template>
<main class="RoutinesView d-flex flex-column justify-start align-center">
	<v-row cols="1">
		<v-col class="d-flex flex-column justify-center align-center" :style="{gap: '10px'}">
			<h1>My Routines</h1>
			<v-tabs v-model="routineStore.activeDay" bg-color="primary">
				<v-tab :value="0">Sunday</v-tab>
				<v-tab :value="1">Monday</v-tab>
				<v-tab :value="2">Tuesday</v-tab>
				<v-tab :value="3">Wednesday</v-tab>
				<v-tab :value="4">Thursday</v-tab>
				<v-tab :value="5">Friday</v-tab>
				<v-tab :value="6">Saturday</v-tab>
			</v-tabs>
		</v-col>
	</v-row>
	<v-row>
		<v-col>
			<WorkoutLog v-for="routine in routineStore.activeDayRoutines"
				:routine="routine"
				:preview="false"
				:key="routine.id" />
		</v-col>
	</v-row>
	<RoutineModal
		@showSnackBar="showSnackBar = true" />
	<footer>Report icon by nawicon</footer>
</main>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Third-party libraries
import Cookies from 'js-cookie';
// Type interfaces
import { ExerciseData, RoutineData } from '@/types/index';
// Pinia stores
import { useRoutineStore } from '@/stores/routineStore';
// Local components
import RoutineModal from '@/components/modals/RoutineModal.vue';
import WorkoutLog from '@/components/ui/WorkoutsView/WorkoutLog.vue';

const getData = async (): Promise<ExerciseData> => {
	return await fetch('https://wger.de/api/v2/exercise?limit=999&language=2')
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
	data () {
		const routineStore = useRoutineStore();
		const userToken = Cookies.get('token');
		const exercises = useQuery('exercises', () => getData());

		return ({
			routineStore,
			weekdays: routineStore.weekdays as string[],
			routines: routineStore.routines as RoutineData[],
			getRoutineData: routineStore.getRoutineData,
			deleteRoutine: routineStore.deleteRoutine,
			addRoutine: routineStore.addRoutine,
			userToken,
			exercises,
			showSnackBar: false
		});
	},
	watch: {
		userToken () {
			this.routineStore.getRoutineData();
		}
	},
	methods: {
		updateUserToken () {
			if (this.userToken !== Cookies.get('token')) {
				this.userToken = Cookies.get('token');
			}
		}
	},
	components: {
		RoutineModal,
		WorkoutLog
	},
	async created () {
		window.setInterval(this.updateUserToken, 100); // Routinely check if user signs in or out
	}
});
</script>

<style scoped lang="scss">
.RoutinesView {
	h1 {
		display: flex;
			justify-content: center;
			align-items: center;
			gap: 10px;

		&::after {
			display: inline-block;
			content: '';
			width: 64px;
			height: 64px;
			background-image: url('/public/images/icons/report.webp');
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center;
		}
	}
}
</style>
