<template>
    <div class="ExerciseDetails">
        <PrevPageButton @click="$router.back()" />
        <h1>{{ exerciseName }}</h1>
        <ul v-if="primaryMuscles">
          <li :key="muscle" v-for="muscle in primaryMuscles">
            <span>{{ getName(muscle, muscleData) }}</span>
          </li>
        </ul>
        <ul v-if="secondaryMuscles">
          <li :key="muscle" v-for="muscle in secondaryMuscles">
            <span>{{ getName(muscle, muscleData) }}</span>
          </li>
        </ul>
        <ul v-if="equipment">
          <li :key="item" v-for="item in equipment">
            <span>{{ getName(item, equipmentData) }}</span>
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
    const exerciseEquipment: any[] = []
    const primaryMuscles: any[] = []
    const secondaryMuscles: any[] = []
    const muscleData: any[] = []
    const equipmentData: any[] = []
    const exercisePics: string[] = []

    return {
      exerciseName,
      exerciseDesc,
      exerciseBase,
      exerciseEquipment,
      primaryMuscles,
      secondaryMuscles,
      muscleData,
      equipmentData,
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
    },
    getName: function (item, data) {
      data.forEach(entry => {
        if (item === entry.id) {
          if (data === this.muscleData) {
            if (entry.name_en) {
              return entry.name_en
            } else {
              return entry.name
            }
          } else if (data === this.equipmentData) {
            return entry.name
          } else {
            return ''
          }
        }
      })()
    }
  },
  async created () {
    this.getResults(`https://wger.de/api/v2/exercise/?name=${this.displayNameUpperCase()}&language=2`, 'name')
      .then(data => {
        if (data !== undefined && data !== null) {
          this.exerciseName = data[0].name
          this.exerciseDesc = data[0].description
          this.exerciseBase = data[0].exercise_base
          this.exerciseEquipment = data[0].equipment
          this.primaryMuscles = data[0].muscles
          this.secondaryMuscles = data[0].muscles_secondary
        }
      })

    await this.getResults(`https://wger.de/api/v2/exerciseimage/?limit=999&exercise_base=${this.exerciseBase}`, 'id')
      .then(data => {
        if (data !== undefined && data !== null) {
          for (const image of data.filter(image => image.exercise_base === this.exerciseBase)) {
            this.exercisePics.push(image.image)
          }
        }
      })

    await this.getResults('https://wger.de/api/v2/muscle?limit=999', 'name')
      .then(data => {
        if (data) {
          this.muscleData = data
        }
      })

    await this.getResults('https://wger.de/api/v2/equipment?limit=999', 'name')
      .then(data => {
        if (data) {
          this.equipmentData = data
        }
      })
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
