<template>
    <div class="DateButton">
        <BackButton @click="$emit('changeDateBack')" />
        <button class="calendar-btn" @click="$emit('openCalendar')">
          <img v-if="dateIsToday()" :src="assetspath('./ui/today.svg')" />
          <img v-else :src="assetspath('./ui/calendar_month.svg')" />
          <span v-if="dateIsToday()">Today</span>
          <span v-else>{{ months[selectedMonth] }} {{ selectedDate }}</span>
        </button>
        <ForwardButton @click="$emit('changeDateForward')" />
    </div>
</template>

<script lang="ts">
// Import global APIs & libraries
import { defineComponent } from 'vue'
// Import mixins
import { fetchImages } from '@/mixins/fetchImages'
// Import components
import BackButton from '@/components/buttons/BackButton.vue'
import ForwardButton from '@/components/buttons/ForwardButton.vue'

export default defineComponent({
  props: ['selectedDate', 'selectedMonth', 'selectedYear', 'months', 'date'],
  components: {
    BackButton,
    ForwardButton
  },
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
    flex-direction: column;
    padding: 5px 10px;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      background: rgb(235,235,235);
    }
  }
}
</style>
