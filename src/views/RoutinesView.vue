<template>
<div class="RoutinesView">
	<h1>My Routines</h1>
	<SelectDay />
	<MyRoutine v-for="routine in routineStore.activeDayRoutines"
		:routine="routine"
		:exercises="exercises.data?.results || []"
		:key="routine.id" />
	<RoutineModal
		title="Add New Routine"
		:style="{position: 'absolute', bottom: 10 + 'px', right: 10 + 'px'}"
		@showSnackBar="showSnackBar = true" />
	<footer>
		<ul>
			<li>Report icon by nawicon</li>
		</ul>
	</footer>
</div>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Third-party libraries
import Cookies from 'js-cookie';
// Type interfaces
import { ExerciseData, Routine } from '@/types/index';
// Pinia stores
import { useRoutineStore } from '@/stores/routineStore';
// Local components
import MyRoutine from '@/components/ui/RoutinesView/MyRoutine.vue';
import SelectDay from '@/components/ui/RoutinesView/SelectDay.vue';
import RoutineModal from '@/components/modals/RoutineModal.vue';

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
			activeDay: routineStore.activeDay as string,
			routines: routineStore.routines as Routine[],
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
		MyRoutine,
		SelectDay,
		RoutineModal
	},
	async created () {
		window.setInterval(this.updateUserToken, 100); // Routinely check if user signs in or out
	}
});
</script>

<style scoped lang="scss">
.RoutinesView {
	display: flex;
		flex-direction: column;
		gap: 10px;
	position: relative;
		z-index: 0;

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

	#day {
		font-size: 18px;
		appearance: none;
	}
}
</style>
