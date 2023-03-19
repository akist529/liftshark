<template>
    <ModalBackground>
      <div class="calendar-modal">
        <CloseButton @click="$emit('handleCalendar')" />
        <div class="calendar-ctrls">
          <BackButton @click="$emit('changeMonthBack')" />
          <span>{{ months[selectedMonth] }} {{ selectedDate }}</span>
          <ForwardButton @click="$emit('changeMonthForward')" />
        </div>
        <div class="calendar-btns">
          <button
            v-for="day in daysInMonth"
            :key="day"
            :class="(day === selectedDate) ? 'active-day' : null"
            @click="$emit('setSelectedDate', day)"
          >{{ day }}</button>
        </div>
      </div>
    </ModalBackground>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalBackground from '@/components/ModalBackground.vue'
import CloseButton from '@/components/buttons/CloseButton.vue'
import BackButton from '@/components/buttons/BackButton.vue'
import ForwardButton from '@/components/buttons/ForwardButton.vue'

export default defineComponent({
  components: {
    ModalBackground,
    CloseButton,
    BackButton,
    ForwardButton
  },
  props: ['selectedDate', 'selectedMonth', 'selectedYear', 'months', 'date', 'daysInMonth']
})
</script>

<style lang="scss">
  .calendar-modal {
    position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80vw;
      height: 80vh;
      background-color: rgb(255, 255, 255);

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
      }

      .calendar-btns {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(6, 1fr);

        button {
          border: none;
        }

        .active-day {
          border: 2px solid var(--button-bg-color);
        }
      }
  }
</style>
