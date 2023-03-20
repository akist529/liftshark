<template>
  <div class="ExerciseView" ref="view">
    <h1>Exercises</h1>
    <div class="page-buttons">
      <BackButton @click="getPage('previous')" />
      <ForwardButton @click="getPage('next')" />
    </div>
    <LoadIcon v-if="!loaded" />
    <ul v-if="loaded" class="exercise-list">
      <MyExercise
        v-for="exercise in exercises"
        :key="exercise.id"
        :exerciseName="getCorrectName(exercise.name)"
        :muscles="getNames(exercise.muscles, muscles)"
        :secondaryMuscles="getNames(exercise.muscles_secondary, muscles)"
        :equipment="getNames(exercise.equipment, equipment)"
        :image="getImage(exercise.exercise_base)" />
    </ul>
    <div class="page-buttons">
      <BackButton @click="getPage('previous')" />
      <ForwardButton @click="getPage('next')" />
    </div>
    <MyFooter />
  </div>
</template>

<script lang="ts">
// Import global APIs & libraries
import { defineComponent } from 'vue'
// Import mixins
import { fetchData } from '@/mixins/fetchData'
// Import types
import { Exercise, Muscle, Equipment, Category, Image } from '@/types/index'
// Import components
import MyExercise from '@/components/MyExercise.vue'
import MyFooter from '@/components/MyFooter.vue'
import BackButton from '@/components/buttons/BackButton.vue'
import ForwardButton from '@/components/buttons/ForwardButton.vue'
import LoadIcon from '@/components/LoadIcon.vue'

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
      offset,
      loaded: false
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
      this.changeLoadStatus()

      if (direction === 'next') {
        this.offset += 10
      } else if (direction === 'previous') {
        this.offset -= 10
      }

      if (this.offset < 0) {
        this.offset = 0
      }

      await this.getResults(`https://wger.de/api/v2/exercise/?limit=10&offset=${this.offset}&language=2`, 'name')
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

      this.changeLoadStatus()
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
    },
    getCorrectName (name: string) {
      const splitName = name.split(' ')
      const correctNameArray: string[] = []

      for (const word of splitName) {
        const correctWord = word[0].toUpperCase() + word.substring(1)
        correctNameArray.push(correctWord)
      }

      const correctName = correctNameArray.join(' ')
      return correctName
    },
    changeLoadStatus () {
      this.loaded = !this.loaded
    }
  },
  mixins: [fetchData],
  components: {
    MyExercise,
    MyFooter,
    BackButton,
    ForwardButton,
    LoadIcon
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

    this.changeLoadStatus()
  }
})
</script>

<style scoped lang="scss">
.ExerciseView {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: var(--content-font);

  h1 {
    font-family: var(--title-font);
    font-weight: 700;
  }

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
