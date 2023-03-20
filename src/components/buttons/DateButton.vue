<template>
    <div class="DateButton">
        <BackButton @click="$emit('changeDateBack')" />
        <button @click="$emit('openCalendar')">
          <img :src="assetspath('./ui/calendar_today.webp')" />
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
}
</style>
