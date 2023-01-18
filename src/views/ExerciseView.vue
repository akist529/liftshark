<template>
  <div class="ExerciseView" ref="ExerciseView">
    <h1>Exercises</h1>
    <ul class="ExerciseList">
      <MyExercise
        v-for="exercise in exercises"
        :key="exercise.id"
        :name="exercise.name"
        :muscles="getNames(exercise.muscles, muscles)"
        :secondaryMuscles="getNames(exercise.muscles_secondary, muscles)"
        :equipment="getNames(exercise.equipment, equipment)"
        :image="getImage(exercise.exercise_base)" />
    </ul>
    <NextPageButton @click="getPage()" />
    <MyFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MyExercise from '@/components/MyExercise.vue'
import MyFooter from '@/components/MyFooter.vue'
import NextPageButton from '@/components/buttons/NextPageButton.vue'
import { fetchData } from '@/mixins/fetchData'
import { Exercise, Muscle, Equipment, Category, Image } from '@/types/index'

export default defineComponent({
  data () {
    const exercises: Exercise[] = []
    const muscles: Muscle[] = []
    const equipment: Equipment[] = []
    const categories: Category[] = []
    const images: Image[] = []
    const offset = 0

    return {
      exercises,
      muscles,
      equipment,
      categories,
      images,
      offset
    }
  },
  methods: {
    getNames: function (arr, data) {
      const names: string[] = []

      arr.forEach(item => {
        data.forEach(entry => {
          if (item === entry.id) {
            names.push((() => {
              if (data === this.muscles) {
                if (entry.name_en) {
                  return entry.name_en
                } else {
                  return entry.name
                }
              } else if (data === this.equipment) {
                return entry.name
              } else {
                return ''
              }
            })())
          }
        })
      })

      return names
    },
    getImage: function (id: number) {
      let imageURL = ''

      this.images.forEach(item => {
        if (item.exercise_base === id) {
          imageURL = item.image
        }
      })

      return imageURL
    },
    getPage: async function () {
      this.getResults(`https://wger.de/api/v2/exercise/?limit=20&offset=${this.offset}&language=2`, 'name')
        .then(data => {
          this.exercises = data
          this.offset += 20

          /*
          this.$nextTick(() => {
            (this.$refs.ExerciseView as any).scrollIntoView({ top: 0, scrollBehavior: 'smooth' })
          })
          */
        })
    }
  },
  mixins: [fetchData],
  components: {
    MyExercise,
    MyFooter,
    NextPageButton
  },
  async created () {
    this.getResults('https://wger.de/api/v2/exercise/?limit=20&language=2', 'name')
      .then(data => { this.exercises = data })
    await this.getResults('https://wger.de/api/v2/muscle?limit=999', 'name')
      .then(data => { this.muscles = data })
    await this.getResults('https://wger.de/api/v2/equipment?limit=999', 'name')
      .then(data => { this.equipment = data })
    await this.getResults('https://wger.de/api/v2/exercisecategory?limit=999', 'name')
      .then(data => { this.categories = data })
    await this.getResults('https://wger.de/api/v2/exerciseimage?limit=999', 'id')
      .then(data => { this.images = data })
  }
})
</script>

<style lang="scss">
.ExerciseView {
  .ExerciseList {
    display: grid;
    grid-template-rows: repeat(auto-fill, auto);
    grid-template-columns: auto;
    gap: 20px;
  }
}
</style>
