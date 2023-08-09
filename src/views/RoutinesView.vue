<template>
<main class="RoutinesView d-flex flex-column justify-start align-center">
	<v-toolbar
		color="primary"
		:height="72"
		extended
	>
		<v-spacer></v-spacer>
		<v-toolbar-title>
			<h1>My Routines</h1>
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<template v-slot:extension>
			<v-tabs
				v-model="routineStore.activeDay"
				bg-color="primary"
				class="w-100"
				align-tabs="center"
				fixed-tabs
				show-arrows
				:direction="windowStore.isTablet ? 'vertical' : 'horizontal'"
			>
				<RoutineTab
					v-for="(day, index) in routineStore.weekdays"
					:key="index"
					:day="day"
					:index="index" />
			</v-tabs>
		</template>
	</v-toolbar>
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
import { useWindowStore } from '@/stores/windowStore';
// Local components
import RoutineModal from '@/components/modals/RoutineModal.vue';
import WorkoutLog from '@/components/ui/WorkoutsView/WorkoutLog.vue';
import RoutineTab from '@/components/ui/RoutinesView/RoutineTab.vue';

const getData = async (): Promise<ExerciseData> => {
	return await fetch('https://wger.de/api/v2/exercise?limit=999&language=2')
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
	data () {
		const routineStore = useRoutineStore();
		const windowStore = useWindowStore();
		const userToken = Cookies.get('token');
		const exercises = useQuery('exercises', () => getData());

		return ({
			routineStore,
			windowStore,
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
		WorkoutLog,
		RoutineTab
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
			gap: 20px;
		font-family: var(--title-font);
			font-weight: 700;

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
