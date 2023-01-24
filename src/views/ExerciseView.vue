<template>
  <div class="ExerciseView" ref="view">
    <h1>Exercises</h1>
    <div class="page-buttons">
      <PrevPageButton @click="getPage('previous')" />
      <NextPageButton @click="getPage('next')" />
    </div>
    <ul class="exercise-list">
      <MyExercise
        v-for="exercise in exercises"
        :key="exercise.id"
        :exerciseName="exercise.name"
        :muscles="getNames(exercise.muscles, muscles)"
        :secondaryMuscles="getNames(exercise.muscles_secondary, muscles)"
        :equipment="getNames(exercise.equipment, equipment)"
        :image="getImage(exercise.exercise_base)" />
    </ul>
    <div class="page-buttons">
      <PrevPageButton @click="getPage('previous')" />
      <NextPageButton @click="getPage('next')" />
    </div>
    <MyFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyExercise from '@/components/MyExercise.vue'
import MyFooter from '@/components/MyFooter.vue'
import PrevPageButton from '@/components/buttons/PrevPageButton.vue'
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
    getImage: function (id: number) {
      let imageURL = ''

      this.images.forEach(item => {
        if (item.exercise_base === id) {
          imageURL = item.image
        }
      })

      return imageURL
    },
    getPage: async function (direction) {
      if (direction === 'next') {
        this.offset += 10
      } else if (direction === 'previous') {
        this.offset -= 10
      }

      if (this.offset < 0) {
        this.offset = 0
      }

      this.getResults(`https://wger.de/api/v2/exercise/?limit=10&offset=${this.offset}&language=2`, 'name')
        .then(data => {
          if (data === null) {
            return
          }

          if (data.length > 0) {
            this.exercises = data
          } else {
            this.offset -= 10
          }
        }).then(() => {
          (this.$refs.view as HTMLDivElement).scrollTo({ top: 0, behavior: 'smooth' })
        })
    },
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
    }
  },
  mixins: [fetchData],
  components: {
    MyExercise,
    MyFooter,
    PrevPageButton,
    NextPageButton
  },
  async created () {
    this.getResults('https://wger.de/api/v2/exercise/?limit=10&language=2', 'name')
      .then(data => {
        if (data) {
          this.exercises = data
        }
      })
    await this.getResults('https://wger.de/api/v2/muscle?limit=999', 'name')
      .then(data => {
        if (data) {
          this.muscles = data
        }
      })
    await this.getResults('https://wger.de/api/v2/equipment?limit=999', 'name')
      .then(data => {
        if (data) {
          this.equipment = data
        }
      })
    await this.getResults('https://wger.de/api/v2/exercisecategory?limit=999', 'name')
      .then(data => {
        if (data) {
          this.categories = data
        }
      })
    await this.getResults('https://wger.de/api/v2/exerciseimage?limit=999', 'id')
      .then(data => {
        if (data) {
          this.images = data
        }
      })
  }
})
</script>

<style lang="scss">
.ExerciseView {
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .page-buttons {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }

  .exercise-list {
    display: grid;
    grid-template-rows: repeat(auto-fill, auto);
    grid-template-columns: auto;
    gap: 20px;
  }
}
</style>
