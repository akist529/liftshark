<template>
<main class="WorkoutsView">
	<h1>My Workouts</h1>
	<DatePicker
		@openCalendar="handleCalendar()"
		@changeDateBack="changeDateBack()"
		@changeDateForward="changeDateForward()" />
	<ModalBackground v-if="calendarOpen">
		<CalendarModal
			@handleCalendar="handleCalendar()"
			@changeMonthBack="changeMonthBack()"
			@changeMonthForward="changeMonthForward()"
			@setSelectedDate="setSelectedDate" />
	</ModalBackground>
	<RoutineSelect v-if="routines.length" />
	<WorkoutLog v-for="workout in workouts"
		:key="workout.id"
		:workout="workout"
		@deleteWorkout="deleteWorkout" />
</main>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Cookies from 'js-cookie';
// Mixins
import { fetchImages } from '@/mixins/fetchImages';
import { fetchRoutines } from '@/mixins/fetchRoutines';
import { fetchWorkouts } from '@/mixins/fetchWorkouts';
// Local components
import DatePicker from '@/components/ui/WorkoutsView/DatePicker.vue';
import CalendarModal from '@/components/ui/WorkoutsView/CalendarModal.vue';
import WorkoutLog from '@/components/WorkoutLog.vue';
import ModalBackground from '@/components/ModalBackground.vue';
import RoutineSelect from '@/components/ui/WorkoutsView/RoutineSelect.vue';

export default defineComponent({
	data () {
		const userToken = Cookies.get('token');
		const date = new Date();
		const selectedDate = date.getDate();
		const selectedDay = date.getDay();
		const selectedMonth = date.getMonth();
		const selectedYear = date.getFullYear();
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const calendarOpen = false;

		return ({
			calendarOpen,
			date,
			selectedDate,
			selectedDay,
			selectedMonth,
			selectedYear,
			months,
			userToken
		});
	},
	provide () {
		return ({
			date: computed(() => this.date),
			months: computed(() => this.months),
			selectedYear: computed({
				get: () => this.selectedYear,
				set: (value) => { this.selectedYear = value }
			}),
			selectedMonth: computed(() => this.selectedMonth),
			selectedDate: computed(() => this.selectedDate)
		});
	},
	watch: {
		selectedDate (date: number) {
			if (date < 1) {
				this.selectedMonth = ((this.selectedMonth += 12) - 1) % 12;
				this.selectedDate = this.daysInMonth(this.selectedYear, this.selectedMonth + 1);
			} else if (date > this.daysInMonth(this.selectedYear, this.selectedMonth + 1)) {
				this.selectedMonth = ((this.selectedMonth += 12) + 1) % 12;
				this.selectedDate = 1;
			}

			this.fetchWorkouts(this.selectedYear, this.selectedMonth, this.selectedDate);
		},
		userToken () {
			this.fetchRoutines();
		}
	},
	components: {
		DatePicker,
		CalendarModal,
		WorkoutLog,
		ModalBackground,
		RoutineSelect
	},
	mixins: [fetchImages, fetchRoutines, fetchWorkouts],
	methods: {
		handleCalendar () {
			this.calendarOpen = !this.calendarOpen;
		},
		daysInMonth (year: number, month: number) {
			return new Date(year, month, 0).getDate();
		},
		changeDateBack () {
			this.selectedDate -= 1;
		},
		changeDateForward () {
			this.selectedDate += 1;
		},
		changeMonthBack () {
			const lastSeenMonth = this.selectedMonth;

			this.selectedMonth = ((this.selectedMonth += 12) - 1) % 12;

			if (this.selectedMonth > lastSeenMonth) this.selectedYear--;
		},
		changeMonthForward () {
			const lastSeenMonth = this.selectedMonth;

			this.selectedMonth = ((this.selectedMonth += 12) + 1) % 12;

			if (this.selectedMonth < lastSeenMonth) this.selectedYear++;
		},
		setSelectedDate (date: number) {
			this.selectedDate = date;
		},
		updateUserToken () {
			if (this.userToken !== Cookies.get('token')) {
				this.userToken = Cookies.get('token');
			}
		},
		async deleteWorkout (id: number) {
			const filteredWorkouts = this.workouts.filter(workout => {
				return workout.id !== id;
			});

			if (Cookies.get('token')) {
				await fetch('http://localhost:1337/apis/workouts', {
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						data: {
							filteredWorkouts
						}
					})
				});
			} else localStorage.setItem('workouts', JSON.stringify(filteredWorkouts));

			this.fetchWorkouts(this.selectedYear, this.selectedMonth, this.selectedDate);
		},
		routinesOfDay (day: string) {
			return this.routines.filter(routine => {
				return routine.attributes.day === day;
			});
		}
	},
	created () {
		this.fetchWorkouts(this.selectedYear, this.selectedMonth, this.selectedDate);
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
