<template>
    <div ref="routineEntry">
        <button @click="deleteEntry">DELETE</button>
        <select name="exercise">
            <option v-for="exercise in exercises"
                :value="exercise.name"
                :key="exercise.name"
            >{{ exercise.name }}</option>
        </select>
        <input
            id="setCount"
            type="number"
            min="1"
            max="6"
            value="0"
            @change="updateSetCount"
        /><span> sets</span>
        <div v-for="set in setCount" :key="set">
            <input type="number" min="1" max="100" value="1" />
            <span> reps</span>
            <input type="number" min="1" max="500" value="1" />
            <span> lbs.</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { fetchData } from '@/mixins/fetchData'
import { Exercise } from '@/types/index'

export default defineComponent({
  data () {
    const setCount = 0

    return {
      setCount
    }
  },
  mixins: [fetchData],
  methods: {
    updateSetCount () {
      this.setCount = Number((document.getElementById('setCount') as HTMLInputElement).value)
      this.$emit('updateRoutine')
    },
    deleteEntry () {
      (this.$refs.routineEntry as HTMLElement).remove()
      this.$emit('updateRoutine')
    }
  },
  props: {
    exercises: {
      type: Array as PropType<Exercise[]>
    }
  }
})
</script>
