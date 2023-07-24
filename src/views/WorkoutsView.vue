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
</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
		RoutineSelect
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
}
</style>
