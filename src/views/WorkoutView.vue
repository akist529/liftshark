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
      <div class="routine-select">
        <select
          name="routine"
          id="routine"
          class="ArrowDown"
          ref="routine"
          :style="`background-image: url(${assetspath('./ui/expand_more.webp')}), linear-gradient(to left, var(--button-bg-color) 0px, var(--button-bg-color) 30px, white 30px, white 100%);`">
            <option
              v-for="routine of routines"
              class="routine-option"
              :value="routine.attributes.name"
              :key="routine.id"
              :id="routine.id.toString()"
            >{{ routine.attributes.name }}</option>
        </select>
        <SubmitButton @click="useRoutine()" />
      </div>
      <div v-for="workout in workouts" :key="workout.id">
        <span>{{ getRoutine(workout.attributes.routine) }}</span>
      </div>
    </div>
</template>

<script lang="ts">
// Import global APIs & libraries
import { defineComponent } from 'vue'
import Cookies from 'js-cookie'
// Import mixins
import { fetchImages } from '@/mixins/fetchImages'
// Import types
import { Routine, Workout } from '@/types/index'
// Import components
import DateButton from '@/components/buttons/DateButton.vue'
import SubmitButton from '@/components/buttons/SubmitButton.vue'
import CalendarModal from '@/components/CalendarModal.vue'

export default defineComponent({
  data () {
    const userToken = Cookies.get('token')
    const date = new Date()
    const selectedDate = date.getDate()
    const selectedDay = date.getDay()
    const selectedMonth = date.getMonth()
    const selectedYear = date.getFullYear()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const calendarOpen = false
    const routines: Routine[] = []
    const workouts: Workout[] = []

    return {
      calendarOpen,
      date,
      selectedDate,
      selectedDay,
      selectedMonth,
      selectedYear,
      months,
      routines,
      userToken,
      workouts
    }
  },
  watch: {
    selectedDate (date: number) {
      if (date < 1) {
        this.selectedMonth = ((this.selectedMonth += 12) - 1) % 12
        this.selectedDate = this.daysInMonth(this.selectedYear, this.selectedMonth + 1)
      } else if (date > this.daysInMonth(this.selectedYear, this.selectedMonth + 1)) {
        this.selectedMonth = ((this.selectedMonth += 12) + 1) % 12
        this.selectedDate = 1
      }

      this.getWorkouts()
    },
    userToken () {
      this.getRoutines()
    }
  },
  components: {
    DateButton,
    SubmitButton,
    CalendarModal
  },
  mixins: [fetchImages],
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
      const lastSeenMonth = this.selectedMonth

      this.selectedMonth = ((this.selectedMonth += 12) - 1) % 12

      if (this.selectedMonth > lastSeenMonth) {
        this.selectedYear--
      }
    },
    changeMonthForward () {
      const lastSeenMonth = this.selectedMonth

      this.selectedMonth = ((this.selectedMonth += 12) + 1) % 12

      if (this.selectedMonth < lastSeenMonth) {
        this.selectedYear++
      }
    },
    setSelectedDate (date) {
      this.selectedDate = date
    },
    async getRoutines () {
      if (Cookies.get('token')) {
        await fetch('http://localhost:1337/api/routines', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
          }
        }).then(response => {
          return response.json()
        }).then(data => {
          this.routines = data.data
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.routines = JSON.parse(localStorage.getItem('routines') || '[]')
      }
    },
    async useRoutine () {
      for (const routine of document.querySelectorAll('.routine-option')) {
        if ((routine as HTMLOptionElement).selected) {
          if (Cookies.get('token')) {
            await fetch('http://localhost:1337/api/workouts', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                data: {
                  date: new Date(this.selectedYear, this.selectedMonth, this.selectedDate, 0).toISOString().split('T')[0],
                  routine: Number((routine as HTMLOptionElement).id)
                }
              })
            }).then(response => {
              console.log(response)
            }).catch(error => {
              console.log(error)
            })
          } else {
            const workouts: Workout[] = JSON.parse(localStorage.getItem('workouts') || '[]')
            workouts.push({
              id: JSON.parse(localStorage.getItem('workouts') || '[]').length,
              attributes: {
                date: new Date(this.selectedYear, this.selectedMonth, this.selectedDate, 0).toISOString().split('T')[0],
                routine: Number((routine as HTMLOptionElement).id)
              }
            })

            localStorage.setItem('workouts', JSON.stringify(workouts))
          }
        }
      }

      this.getWorkouts()
    },
    updateUserToken () {
      if (this.userToken !== Cookies.get('token')) {
        this.userToken = Cookies.get('token')
      }
    },
    async getWorkouts () {
      if (Cookies.get('token')) {
        await fetch('http://localhost:1337/api/workouts', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
          }
        }).then(response => {
          return response.json()
        }).then(data => {
          const workouts: Workout[] = []

          for (const workout of data.data) {
            if (workout.attributes.date === new Date(this.selectedYear, this.selectedMonth, this.selectedDate, 0).toISOString().split('T')[0]) {
              workouts.push(workout)
            }
          }

          this.workouts = workouts
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.workouts = JSON.parse(localStorage.getItem('workouts') || '[]')
      }
    },
    getRoutine (workoutID: number) {
      for (const routine of this.routines) {
        if (routine.id === workoutID) {
          return routine.attributes.name
        }
      }
    }
  },
  created () {
    this.getRoutines()
    this.getWorkouts()
    window.setInterval(this.updateUserToken, 100) // Routinely check if user signs in or out
  }
})
</script>

<style scoped lang="scss">
.WorkoutView {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;

  .routine-select {
    display: flex;
    justify-content: center;
    align-items: center;

    #routine {
      font-size: 18px;
      appearance: none;
    }
  }
}

.ArrowDown {
  background-repeat: no-repeat, repeat;
  background-position: right 10px top 50%, 0 0;
  background-size: .65em auto, 100%;
  padding: 0 5px;
  width: 150px;
}
</style>
