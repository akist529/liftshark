<template>
  <div class="ExerciseView">
    <h1>Exercises</h1>
    <div class="ExerciseList">
      <span v-for="exercise in exercises" v-bind:key="exercise.id">{{ exercise.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Exercise {
  id: number
  uuid: string
  name: string
  // eslint-disable-next-line camelcase
  exercise_base: number
  description: string
  // eslint-disable-next-line camelcase
  creation_date: string
  category: number
  muscles: string[]
  // eslint-disable-next-line camelcase
  muscles_secondary: string[]
  equipment: number[]
  langage: number
  license: number
  // eslint-disable-next-line camelcase
  license_author: string
  variations: number[]
  // eslint-disable-next-line camelcase
  author_history: string[]
}

export default defineComponent({
  data () {
    const exercises: Exercise[] = []

    return {
      exercises
    }
  },
  methods: {
    getExerciseData: async function () {
      try {
        const response = await fetch('https://wger.de/api/v2/exercise?limit=999&language=2')
        return await response.json()
      } catch (error) {
        console.log(error)
      }
    },
    getExercises: async function () {
      const data = await this.getExerciseData()
      const results: Exercise[] = data.results
      const key = 'name'
      const unique = [...new Map(results.map(item => [item[key], item])).values()]
      this.exercises = unique
    }
  },
  mounted () {
    this.getExercises()
  }
})
</script>

<style lang="scss">
.ExerciseView {
  display: flex;
  flex-direction: column;

  .ExerciseList {
    display: flex;
    flex-direction: column;
  }
}
</style>
