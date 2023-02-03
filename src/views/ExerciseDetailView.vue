<template>
    <div v-if="loaded" class="ExerciseDetails">
        <div class="exercise-header">
          <BackButton @click="$router.back()" />
          <h1>{{ exercise.name }}</h1>
          <BookmarkButton />
        </div>
        <div class="add-buttons">
          <AddButton>
            <span>Add to Routine</span>
            <img alt="Routine" src="@/../public/images/ui/sidebar/routines.webp" />
          </AddButton>
          <AddButton>
            <span>Add to Workout</span>
            <img alt="Workout" src="@/../public/images/ui/sidebar/workouts.webp" />
          </AddButton>
        </div>
        <h2 v-if="exercise.muscles.length">Primary Muscles</h2>
        <ul v-if="exercise.muscles.length">
          <li :key="muscle" v-for="muscle in exercise.muscles">
            <figure>
              <img
                :alt="getMuscleName(muscle)"
                :title="getMuscleName(muscle)"
                :src="assetspath(`./${getFileName(muscle, getMuscleName)}`)"
              />
              <figcaption>{{ (getMuscleName(muscle).split(' '))[0] }}</figcaption>
            </figure>
          </li>
        </ul>
        <h2 v-if="exercise.muscles_secondary.length">Secondary Muscles</h2>
        <ul v-if="exercise.muscles_secondary.length">
          <li :key="muscle" v-for="muscle in exercise.muscles_secondary">
            <figure>
              <img
                :alt="getMuscleName(muscle)"
                :title="getMuscleName(muscle)"
                :src="assetspath(`./${getFileName(muscle, getMuscleName)}`)"
              />
              <figcaption>{{ (getMuscleName(muscle).split(' '))[0] }}</figcaption>
            </figure>
          </li>
        </ul>
        <h2 v-if="exercise.equipment.length">Equipment</h2>
        <ul v-if="exercise.equipment.length">
          <li :key="item" v-for="item in exercise.equipment">
            <figure>
              <img
                :alt="getEquipmentName(item)"
                :title="getEquipmentName(item)"
                :src="assetspath(`./${getFileName(item, getEquipmentName)}`)"
              />
              <figcaption>{{ getEquipmentName(item) }}</figcaption>
            </figure>
          </li>
        </ul>
        <p v-if="exercise.description" :innerHTML="exercise.description"></p>
        <ul v-if="images" class="exercise-pics">
          <li :key="image.id" v-for="image in images">
            <img alt="Exercise Example" :src="image.image" />
          </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddButton from '@/components/buttons/AddButton.vue'
import BookmarkButton from '@/components/buttons/BookmarkButton.vue'
import BackButton from '@/components/buttons/BackButton.vue'
import { fetchData } from '@/mixins/fetchData'
import { fetchImages } from '@/mixins/fetchImages'
import { Exercise, Muscle, Equipment, Category, Image } from '@/types/index'

export default defineComponent({
  components: {
    AddButton,
    BookmarkButton,
    BackButton
  },
  mixins: [fetchData, fetchImages],
  data () {
    const exercise = {} as Exercise
    const muscles: Muscle[] = []
    const equipment: Equipment[] = []
    const categories: Category[] = []
    const images: Image[] = []

    return {
      exercise,
      muscles,
      equipment,
      categories,
      images,
      loaded: false
    }
  },
  methods: {
    async getExerciseData () {
      this.getResults(`https://wger.de/api/v2/exercise/?name=${this.getDisplayName()}&language=2`, 'name')
        .then(data => {
          if (data) {
            this.exercise = data[0] as Exercise
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

      // eslint-disable-next-line
      await this.getResults(`https://wger.de/api/v2/exerciseimage/?limit=999&exercise_base=${this.exercise.exercise_base}`, 'id')
        .then(data => {
          if (data) {
            for (const image of data.filter(image => image.exercise_base === this.exercise.exercise_base)) {
              this.images.push(image)
            }
          }
        })

      this.loaded = true
    },
    getDisplayName () {
      const displayName: string = (this.$route.params.id as string).split('-').map(word => (word[0].toUpperCase() + word.slice(1))).join(' ')
      return displayName
    },
    getMuscleName (item: number) {
      for (let i = 0; i < this.muscles.length; i++) {
        if (item === this.muscles[i].id) {
          if (this.muscles[i].name_en) {
            return this.muscles[i].name_en
          } else {
            return this.muscles[i].name
          }
        }
      }

      return 'test'
    },
    getEquipmentName (item: number) {
      for (let i = 0; i < this.equipment.length; i++) {
        if (item === this.equipment[i].id) {
          return this.equipment[i].name
        }
      }

      return ''
    },
    getFileName (item: number, callback) {
      const name = callback(item)

      if (name === 'Obliquus externus abdominis') {
        return 'ui/exercises/obliques.webp'
      } else if (name === 'Soleus') {
        return 'ui/exercises/calves.webp'
      } else if (name === 'SZ-Bar') {
        return 'ui/exercises/ez-bar.webp'
      } else {
        return `ui/exercises/${name.toLowerCase().replaceAll(' ', '-').replaceAll(/[()]/g, '')}.webp`
      }
    }
  },
  created () {
    this.getExerciseData()
  }
})
</script>

<style lang="scss">
.ExerciseDetails {
  font-family: var(--content-font);

  h1 {
    font-family: var(--title-font);
    font-weight: 700;
    text-align: center;
  }

  h2 {
    font-weight: 500;
  }

  ul {
    list-style-type: none;
    display: grid;
    grid-template-rows: repeat(6, auto);
    font-weight: 300;

    li {
      figure {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }

  .exercise-header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .add-buttons {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }

  .exercise-pics {
    list-style-type: none;
    display: flex;
    justify-items: space-around;
    align-items: center;

    li {
      img {
        max-width: 250px;
      }
    }
  }
}
</style>
