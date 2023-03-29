<template>
    <div class="DateButton">
        <button title="Last Month" @click="$emit('changeDateBack')">
          <img alt="Last Month" :src="assetspath('./ui/chevron_left.svg')" />
        </button>
        <button class="calendar-btn" title="Change Date" @click="$emit('openCalendar')">
          <img v-if="dateIsToday()" :src="assetspath('./ui/today.svg')" />
          <img v-else :src="assetspath('./ui/calendar_month.svg')" />
          <span id="today" v-if="dateIsToday()">Today</span>
          <div v-else>
            <span>{{ months[selectedMonth] }}</span>
            <hr/>
            <span>{{ selectedDate }}</span>
          </div>
        </button>
        <button title="Next Month" @click="$emit('changeDateForward')">
          <img alt="Next Month" :src="assetspath('./ui/chevron_right.svg')" />
        </button>
    </div>
</template>

<script lang="ts">
// Import global APIs & libraries
import { defineComponent } from 'vue'
// Import mixins
import { fetchImages } from '@/mixins/fetchImages'

export default defineComponent({
  props: ['selectedDate', 'selectedMonth', 'selectedYear', 'months', 'date'],
  mixins: [fetchImages],
  methods: {
    dateIsToday () {
      const dateSelected = `${this.selectedYear}-${this.selectedMonth}-${this.selectedDate}`
      const actualDate = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`

      if (actualDate === dateSelected) {
        return true
      } else {
        return false
      }
    }
  }
})
</script>

<style scoped lang="scss">
.DateButton {
  display: flex;
  gap: 10px;
  align-items: center;

  .calendar-btn {
    display: flex;
    padding: 5px 10px;

    &:hover {
      background: rgb(235,235,235);
    }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    > div {
      display: flex;
      gap: 10px;
    }

    span {
      font-size: 32px;
    }

    #today {
      font-weight: 700;
    }
  }
}
</style>
