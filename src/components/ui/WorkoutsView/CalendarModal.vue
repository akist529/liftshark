<template>
<div class="CalendarModal">
	<CloseButton @click="$emit('handleCalendar')" />
	<div class="calendar-ctrls">
		<PrevMonthButton @changeMonthBack="changeToLastMonth" />
		<CalendarDate />
		<NextMonthButton @changeMonthForward="changeToNextMonth" />
	</div>
	<div class="calendar-btns">
		<button v-for="day in firstDayInMonth"
			:key="day"
			class="prev-month"
			@click="changeToLastMonth(day)"
		>{{ lastDateInPreviousMonth - (firstDayInMonth - day) }}</button>
		<button v-for="day in daysInMonth"
			:key="day"
			:class="(day === selectedDate) ? 'active-day' : ''"
			@click="$emit('setSelectedDate', day)"
		>{{ day }}</button>
		<button v-for="day in (42 - (daysInMonth + firstDayInMonth))"
			:key="day"
			class="next-month"
			@click="changeToNextMonth(day)"
		>{{ day }}</button>
	</div>
</div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
// Mixins
import { fetchImages } from '@/mixins/fetchImages';
// Local components
import CloseButton from '@/components/buttons/CloseButton.vue';
import PrevMonthButton from '@/components/ui/WorkoutsView/CalendarModal/PrevMonthButton.vue';
import NextMonthButton from '@/components/ui/WorkoutsView/CalendarModal/NextMonthButton.vue';
import CalendarDate from '@/components/ui/WorkoutsView/CalendarModal/CalendarDate.vue';

export default defineComponent({
	data () {
		// Injected data
		const selectedYear: number = inject<any>('selectedYear');
		const selectedMonth: number = inject<any>('selectedMonth') || 0;
		const selectedDate: number = inject<any>('selectedDate') || 0;
		const date: Date = inject('date') || new Date();
		const months: string[] = inject('months') || [];

		const firstDayInMonth = new Date(selectedYear, selectedMonth, 1).getDay();
		console.log(selectedYear);
		const lastDateInPreviousMonth = new Date(selectedYear, selectedMonth, 0).getDate();

		return ({
			selectedYear,
			selectedMonth,
			selectedDate,
			date,
			months,
			firstDayInMonth,
			lastDateInPreviousMonth
		});
	},
	components: {
		CloseButton,
		PrevMonthButton,
		NextMonthButton,
		CalendarDate
	},
	watch: {
		selectedMonth () {
			this.firstDayInMonth = this.getFirstDayInMonth();
			this.lastDateInPreviousMonth = this.getLastDateInPreviousMonth();
		}
	},
	mixins: [fetchImages],
	computed: {
		daysInMonth () {
			return new Date(this.selectedYear as number, this.selectedMonth as number, 0).getDate();
		}
	},
	methods: {
		getFirstDayInMonth () {
			const date = new Date(this.selectedYear as number, this.selectedMonth as number, 1);
			return date.getDay();
		},
		getLastDateInPreviousMonth () {
			const date = new Date(this.selectedYear as number, this.selectedMonth as number, 0);
			return date.getDate();
		},
		changeToLastMonth (day: number) {
			this.$emit('setSelectedDate', this.lastDateInPreviousMonth - (this.firstDayInMonth - day));
			this.$emit('changeMonthBack');
		},
		changeToNextMonth (day: number) {
			this.$emit('setSelectedDate', day);
			this.$emit('changeMonthForward');
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

	.calendar-ctrls {
		display: flex;
			justify-content: space-between;
			align-items: center;
		width: 100%;
	}

	.calendar-btns {
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
