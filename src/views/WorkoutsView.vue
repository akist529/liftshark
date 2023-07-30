<template>
<main class="WorkoutsView">
	<h1>My Workouts</h1>
	<DatePicker />
	<ModalBackground v-if="workoutStore.calendarOpen">
		<CalendarModal />
	</ModalBackground>
	<RoutineSelect v-if="routineStore.routines.length" />
	<WorkoutLog v-for="workout in workoutStore.workouts"
		:key="workout.id"
		:workout="workout" />
	<AddButton
		title="Add New Workout"
		@click="workoutStore.toggleWorkoutModal"
		:style="{position: 'absolute', bottom: 10 + 'px', right: 10 + 'px'}" />
</main>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Third-party libraries
import Cookies from 'js-cookie';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useRoutineStore } from '@/stores/routineStore';
// Mixins
import { fetchImages } from '@/mixins/fetchImages';
// Local components
import DatePicker from '@/components/ui/WorkoutsView/DatePicker.vue';
import CalendarModal from '@/components/ui/WorkoutsView/CalendarModal.vue';
import WorkoutLog from '@/components/ui/WorkoutsView/WorkoutLog.vue';
import ModalBackground from '@/components/ModalBackground.vue';
import RoutineSelect from '@/components/ui/WorkoutsView/RoutineSelect.vue';
import AddButton from '@/components/buttons/AddButton.vue';

export default defineComponent({
	data () {
		const userToken = Cookies.get('token');
		const workoutStore = useWorkoutStore();
		const routineStore = useRoutineStore();

		return ({
			workoutStore,
			routineStore,
			months: workoutStore.months,
			userToken
		});
	},
	watch: {
		selectedDate (date: number) {
			if (date < 1) {
				this.workoutStore.selectedMonth = ((this.workoutStore.selectedMonth += 12) - 1) % 12;
				this.workoutStore.selectedDate = this.daysInMonth(this.selectedYear, this.selectedMonth + 1);
			} else if (date > this.daysInMonth(this.selectedYear, this.selectedMonth + 1)) {
				this.workoutStore.selectedMonth = ((this.workoutStore.selectedMonth += 12) + 1) % 12;
				this.workoutStore.selectedDate = 1;
			}
		}
	},
	components: {
		DatePicker,
		CalendarModal,
		WorkoutLog,
		ModalBackground,
		RoutineSelect,
		AddButton
	},
	mixins: [fetchImages],
	methods: {
		daysInMonth (year: number, month: number) {
			return new Date(year, month, 0).getDate();
		},
		updateUserToken () {
			if (this.userToken !== Cookies.get('token')) {
				this.userToken = Cookies.get('token');
			}
		},
		routinesOfDay (day: string) {
			return this.routineStore.routines.filter(routine => {
				return routine.attributes.day === day;
			});
		}
	},
	created () {
		window.setInterval(this.updateUserToken, 100); // Routinely check if user signs in or out
	}
})
</script>

<style scoped lang="scss">
.WorkoutsView {
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
			background-image: url('/public/images/icons/exercise.webp');
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center;
		}
	}
}
</style>
