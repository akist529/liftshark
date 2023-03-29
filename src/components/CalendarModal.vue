<template>
    <ModalBackground>
      <div class="calendar-modal">
        <CloseButton @click="$emit('handleCalendar')" />
        <div class="calendar-ctrls">
          <button class="calendar-btn-left" title="Last Month" @click="$emit('changeMonthBack')">
            <span>{{ months[(selectedMonth + 12 - 1) % 12] }}</span>
            <img alt="Last Month" :src="assetspath('./ui/chevron_left.svg')" />
          </button>
          <div class="calendar-date">
            <span>{{ selectedDate }}</span>
            <hr/>
            <div>
              <span>{{ months[selectedMonth] }}</span>
              <span>{{ selectedYear }}</span>
            </div>
          </div>
          <button class="calendar-btn-right" title="Next Month" @click="$emit('changeMonthForward')">
            <img alt="Next Month" :src="assetspath('./ui/chevron_right.svg')" />
            <span>{{ months[(selectedMonth + 12 + 1) % 12] }}</span>
          </button>
        </div>
        <div class="calendar-btns">
          <button
            class="prev-month"
            :key="day"
            v-for="day in firstDayInMonth"
            @click="changeToLastMonth(day)"
          >
            {{ lastDateInPreviousMonth - (firstDayInMonth - day) }}
          </button>
          <button
            v-for="day in daysInMonth"
            :key="day"
            :class="(day === selectedDate) ? 'active-day' : null"
            @click="$emit('setSelectedDate', day)"
          >{{ day }}</button>
          <button
            class="next-month"
            :key="day"
            v-for="day in (42 - (daysInMonth + firstDayInMonth))"
            @click="changeToNextMonth(day)"
          >
            {{ day }}
          </button>
        </div>
      </div>
    </ModalBackground>
</template>

<script lang="ts">
// Import global APIs & libraries
import { defineComponent } from 'vue'
// Import components
import ModalBackground from '@/components/ModalBackground.vue'
import CloseButton from '@/components/buttons/CloseButton.vue'
import { fetchImages } from '@/mixins/fetchImages'

export default defineComponent({
  data () {
    const firstDayInMonth = new Date(this.selectedYear, this.selectedMonth, 1).getDay()
    const lastDateInPreviousMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate()

    return {
      firstDayInMonth,
      lastDateInPreviousMonth
    }
  },
  components: {
    ModalBackground,
    CloseButton
  },
  watch: {
    selectedMonth () {
      this.firstDayInMonth = this.getFirstDayInMonth()
      this.lastDateInPreviousMonth = this.getLastDateInPreviousMonth()
    }
  },
  mixins: [fetchImages],
  props: ['selectedDate', 'selectedMonth', 'selectedYear', 'months', 'date', 'daysInMonth'],
  methods: {
    getFirstDayInMonth () {
      return new Date(this.selectedYear, this.selectedMonth, 1).getDay()
    },
    getLastDateInPreviousMonth () {
      return new Date(this.selectedYear, this.selectedMonth, 0).getDate()
    },
    changeToLastMonth (day: number) {
      this.$emit('setSelectedDate', this.lastDateInPreviousMonth - (this.firstDayInMonth - day))
      this.$emit('changeMonthBack')
    },
    changeToNextMonth (day: number) {
      this.$emit('setSelectedDate', day)
      this.$emit('changeMonthForward')
    }
  }
})
</script>

<style scoped lang="scss">
  .calendar-modal {
    position: relative;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 380px;
    background-color: rgb(255, 255, 255);
    border: 3px solid rgba(0,0,0,0.2);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px;

    .calendar-ctrls {
      display: flex;
      justify-content: center;
      align-items: center;

      .calendar-btn-left,
      .calendar-btn-right {
        display: flex;
        justify-content: center;
        align-items: center;
        background: none;
        border: none;
        cursor: pointer;
      }

      .calendar-date {
        display: flex;
        gap: 10px;

        > span {
          font-size: 48px;
        }

        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 24px;
        }
      }
    }

    .calendar-btns {
      display: grid;
      grid-template-columns: repeat(7, 40px);
      grid-template-rows: repeat(6, 40px);
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

      .prev-month,
      .next-month {
        background: rgb(175,175,175);
      }
    }
  }
</style>
