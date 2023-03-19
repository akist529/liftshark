<template>
    <div class="WorkoutView">
        <h1>My Workouts</h1>
        <DateButton
          :selectedDate="selectedDate"
          :selectedMonth="selectedMonth"
          :selectedYear="selectedYear"
          :months="months"
          :date="date"
          @openCalendar="handleCalendar()"
          @changeDateBack="changeDateBack()"
          @changeDateForward="changeDateForward()"
        />
        <CalendarModal
        v-if="calendarOpen"
        :selectedDate="selectedDate"
        :selectedMonth="selectedMonth"
        :selectedYear="selectedYear"
        :months="months"
        :date="date"
        :daysInMonth="daysInMonth(selectedYear, selectedMonth + 1)"
        @handleCalendar="handleCalendar()"
        @changeMonthBack="changeMonthBack()"
        @changeMonthForward="changeMonthForward()"
        @setSelectedDate="setSelectedDate"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DateButton from '@/components/buttons/DateButton.vue'
import CalendarModal from '@/components/CalendarModal.vue'

export default defineComponent({
  data () {
    const calendarOpen = false
    const date = new Date()
    const selectedDate = date.getDate()
    const selectedDay = date.getDay()
    const selectedMonth = date.getMonth()
    const selectedYear = date.getFullYear()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return {
      calendarOpen,
      date,
      selectedDate,
      selectedDay,
      selectedMonth,
      selectedYear,
      months
    }
  },
  watch: {
    selectedDate (date: number) {
      if (date < 1) {
        this.selectedMonth = ((this.selectedMonth += 12) - 1) % 12
        this.selectedDate = this.daysInMonth(this.selectedYear, this.selectedMonth + 1)
      }

      if (date > this.daysInMonth(this.selectedYear, this.selectedMonth + 1)) {
        this.selectedMonth = ((this.selectedMonth += 12) + 1) % 12
        this.selectedDate = 1
      }
    }
  },
  components: {
    DateButton,
    CalendarModal
  },
  methods: {
    handleCalendar () {
      this.calendarOpen = !this.calendarOpen
    },
    daysInMonth (year: number, month: number) {
      return new Date(year, month, 0).getDate()
    },
    changeDateBack () {
      this.selectedDate -= 1
    },
    changeDateForward () {
      this.selectedDate += 1
    },
    changeMonthBack () {
      this.selectedMonth = ((this.selectedMonth += 12) - 1) % 12
    },
    changeMonthForward () {
      this.selectedMonth = ((this.selectedMonth += 12) + 1) % 12
    },
    setSelectedDate (date) {
      this.selectedDate = date
    }
  },
  created () {
    this.date = new Date()
  }
})
</script>

<style lang="scss">
.WorkoutView {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
