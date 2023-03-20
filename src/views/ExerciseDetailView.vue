<template>
    <div>
      <LoadIcon v-if="!loaded" />
      <div v-if="loaded" class="ExerciseDetails">
          <div class="exercise-header">
            <h1>{{ exercise.name }}</h1>
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
          <div class="exercise-btns">
            <BackButton class="back-btn" @click="$router.back()" />
            <BurgerButton class="burger-btn">
              <BurgerMenuButton>
                <span>Add to Routine</span>
                <img alt="Routine" src="@/../public/images/ui/sidebar/routines.webp" />
              </BurgerMenuButton>
              <BurgerMenuButton>
                <span>Add to Workout</span>
                <img alt="Workout" src="@/../public/images/ui/sidebar/workouts.webp" />
              </BurgerMenuButton>
            </BurgerButton>
            <BookmarkButton class="bookmark-btn" />
          </div>
      </div>
    </div>
</template>

<script lang="ts">
// Import global APIs & libraries
import { defineComponent } from 'vue'
// Import mixins
import { fetchData } from '@/mixins/fetchData'
import { fetchImages } from '@/mixins/fetchImages'
// Import types
import { Exercise, Muscle, Equipment, Category, Image } from '@/types/index'
// Import components
import BookmarkButton from '@/components/buttons/BookmarkButton.vue'
import BackButton from '@/components/buttons/BackButton.vue'
import BurgerButton from '@/components/buttons/BurgerButton.vue'
import BurgerMenuButton from '@/components/buttons/BurgerMenuButton.vue'
import LoadIcon from '@/components/LoadIcon.vue'

export default defineComponent({
  components: {
    BookmarkButton,
    BackButton,
    BurgerButton,
    BurgerMenuButton,
    LoadIcon
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

<style scoped lang="scss">
.ExerciseDetails {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 50px;
  position: relative;
  width: 100%;

  font-family: var(--content-font);

  h1 {
    font-family: var(--title-font);
    font-weight: 700;
    font-size: 6vw;
    text-align: center;
  }

  h2 {
    font-weight: 500;
    text-align: center;
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-weight: 300;

    li {
      figure {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }

  .add-buttons {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }

  .exercise-pics {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    li {
      img {
        max-width: 250px;
      }
    }
  }

  .exercise-btns {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    position: fixed;
    bottom: 80px;
    left: 0;
    right: 0;

    img {
      filter: invert(1);
      width: 40px;
    }
  }
}
</style>
