<template>
<dialog open class="CalendarModal">
	<CloseButton @click="workoutStore.closeCalendar" />
	<table>
		<thead>
			<tr>
				<PrevMonthButton
					@click="workoutStore.changeMonthBack" />
				<CalendarDate />
				<NextMonthButton
					@click="workoutStore.changeMonthForward" />
			</tr>
			<tr>
				<th>Sun</th>
				<th>Mon</th>
				<th>Tue</th>
				<th>Wed</th>
				<th>Thu</th>
				<th>Fri</th>
				<th>Sat</th>
			</tr>
		</thead>
		<tbody>
			<button v-for="day in workoutStore.firstDayInMonth"
				:key="day"
				class="prev-month"
				@click="changeToLastMonth(day)"
			>{{ workoutStore.lastDateInPreviousMonth - (workoutStore.firstDayInMonth - day) }}</button>
			<button v-for="day in workoutStore.daysInMonth"
				:key="day"
				:class="(day === workoutStore.selectedDate) ? 'active-day' : ''"
				@click="workoutStore.setSelectedDate(day)"
			>{{ day }}</button>
			<button v-for="day in (42 - (workoutStore.daysInMonth + workoutStore.firstDayInMonth))"
				:key="day"
				class="next-month"
				@click="changeToNextMonth(day)"
			>{{ day }}</button>
		</tbody>
	</table>
</dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// Mixins
import { fetchImages } from '@/mixins/fetchImages';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
// Local components
import CloseButton from '@/components/buttons/CloseButton.vue';
import PrevMonthButton from '@/components/ui/WorkoutsView/CalendarModal/PrevMonthButton.vue';
import NextMonthButton from '@/components/ui/WorkoutsView/CalendarModal/NextMonthButton.vue';
import CalendarDate from '@/components/ui/WorkoutsView/CalendarModal/CalendarDate.vue';

export default defineComponent({
	data () {
		const workoutStore = useWorkoutStore();

		return ({
			workoutStore
		});
	},
	components: {
		CloseButton,
		PrevMonthButton,
		NextMonthButton,
		CalendarDate
	},
	mixins: [fetchImages],
	methods: {
		changeToLastMonth (day: number) {
			const date = this.workoutStore.lastDateInPreviousMonth - (this.workoutStore.firstDayInMonth - day);
			this.workoutStore.setSelectedDate(date);
			this.workoutStore.changeMonthBack();
		},
		changeToNextMonth (day: number) {
			this.workoutStore.setSelectedDate(day);
			this.workoutStore.changeMonthForward();
		}
	}
});
</script>

<style scoped lang="scss">
.CalendarModal {
	/* Positioning */
	display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	position: relative;
		z-index: 2;
		top: 50%;
		left: 50%;
	transform: translate(-50%, -50%);

	/* Visual */
	width: 300px;
	height: 380px;
	background-color: rgb(255, 255, 255);
	border: 3px solid rgba(0,0,0,0.2);
	padding: 10px;

	thead tr {
		display: flex;
			justify-content: space-between;
			align-items: center;
		width: 100%;
	}

	tbody {
		/* Positioning */
		display: grid;
			grid-template-columns: repeat(7, 40px);
			grid-template-rows: repeat(6, 40px);

		/* Visual */
		background: rgb(235,235,235);
		border: 2px solid black;

		button {
			border: 1px solid rgba(0,0,0,0.2);
			font-size: 18px;
			text-align: center;
			cursor: pointer;
		}

		.active-day {
			border: 3px solid var(--button-bg-color);
				border-radius: 50%;
			font-size: 24px;
		}

		.prev-month, .next-month {
			background: rgb(175,175,175);
		}
	}
}
</style>
