<template>
    <div class="ExerciseDetails">
        <PrevPageButton @click="$router.back()" />
        <h1>{{ exerciseName }}</h1>
        <ul v-if="primaryMuscles">
          <li :key="muscle" v-for="muscle in primaryMuscles">
            <span>{{ muscle }}</span>
          </li>
        </ul>
        <ul v-if="secondaryMuscles">
          <li :key="muscle" v-for="muscle in secondaryMuscles">
            <span>{{ muscle }}</span>
          </li>
        </ul>
        <ul v-if="equipment">
          <li :key="item" v-for="item in equipment">
            <span>{{ item }}</span>
          </li>
        </ul>
        <p v-if="exerciseDesc" :innerHTML="exerciseDesc"></p>
        <ul class="exercise-pics" v-if="exercisePics">
          <li :key="image" v-for="image in exercisePics">
            <img alt="Exercise Example" :src="image" />
          </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PrevPageButton from '@/components/buttons/PrevPageButton.vue'
import { fetchData } from '@/mixins/fetchData'

export default defineComponent({
  components: {
    PrevPageButton
  },
  mixins: [fetchData],
  data () {
    const exerciseName = ''
    const exerciseDesc = ''
    const exerciseBase = ''
    const primaryMuscles: any[] = []
    const secondaryMuscles: any[] = []
    const equipment: any[] = []
    const exercisePics: string[] = []

    return {
      exerciseName,
      exerciseDesc,
      exerciseBase,
      primaryMuscles,
      secondaryMuscles,
      equipment,
      exercisePics
    }
  },
  methods: {
    displayNameUpperCase () {
      const displayName = (this.$route.params.id as string).split('-').map(word => (word[0].toUpperCase() + word.slice(1))).join(' ')

      return displayName
    },
    displayNameLowerCase () {
      let displayName: any = (this.$route.params.id as string).split('-')
      displayName = displayName[0] + displayName[1].toUpperCase()

      return displayName
    }
  },
  async created () {
    try {
      this.getResults(`https://wger.de/api/v2/exercise/?name=${this.displayNameUpperCase()}&language=2`, 'name')
        .then(data => {
          if (data !== undefined && data !== null) {
            this.exerciseName = data[0].name
            this.exerciseDesc = data[0].description
            this.exerciseBase = data[0].exercise_base
            this.primaryMuscles = data[0].muscles
            this.secondaryMuscles = data[0].muscles_secondary
            this.equipment = data[0].equipment
          }
        })
    } catch (error) {
      console.log(error)
    }

    try {
      await this.getResults(`https://wger.de/api/v2/exerciseimage/?limit=999&exercise_base=${this.exerciseBase}`, 'id')
        .then(data => {
          if (data !== undefined && data !== null) {
            for (const image of data.filter(image => image.exercise_base === this.exerciseBase)) {
              this.exercisePics.push(image.image)
            }
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
})
</script>

<style lang="scss">
.ExerciseDetails {
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
