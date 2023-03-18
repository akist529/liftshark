<template>
    <div class="DateButton">
        <BackButton @click="changeDateBack()" />
        <button>
          <img :src="assetspath('./ui/calendar_today.webp')" />
          <span v-if="dateIsToday()">Today</span>
          <span v-else>{{ months[selectedMonth] }} {{ selectedDate }}</span>
        </button>
        <ForwardButton @click="changeDateForward()" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fetchImages } from '@/mixins/fetchImages'
import BackButton from '@/components/buttons/BackButton.vue'
import ForwardButton from '@/components/buttons/ForwardButton.vue'

export default defineComponent({
  data () {
    const date = new Date()
    const selectedDate = date.getDate()
    const selectedDay = date.getDay()
    const selectedMonth = date.getMonth()
    const selectedYear = date.getFullYear()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return {
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
    BackButton,
    ForwardButton
  },
  mixins: [fetchImages],
  methods: {
    changeDateBack () {
      this.selectedDate -= 1
    },
    changeDateForward () {
      this.selectedDate += 1
    },
    daysInMonth (year: number, month: number) {
      return new Date(year, month, 0).getDate()
    },
    dateIsToday () {
      const dateSelected = `${this.selectedYear}-${this.selectedMonth}-${this.selectedDate}`
      const actualDate = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`

      if (actualDate === dateSelected) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.date = new Date()
  }
})
</script>

<style lang="scss">
.DateButton {
  display: flex;
}
</style>
