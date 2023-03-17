<template>
    <div class="WorkoutView">
        <h1>My Workouts</h1>
        <DateButton />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DateButton from '@/components/buttons/DateButton.vue'

export default defineComponent({
  components: {
    DateButton
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
