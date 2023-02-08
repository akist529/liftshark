<template>
    <div>
        <h1>My Routines</h1>
        <select name="day" id="day">
            <option
                v-for="day of weekdays"
                :value="day.toLowerCase()"
                :key="day"
            >{{ day }}</option>
        </select>
        <h2>{{ activeDay }}</h2>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const activeDay = 'Sunday'

    return {
      weekdays,
      activeDay
    }
  }
})
</script>

<style scoped lang="scss">
</style>
