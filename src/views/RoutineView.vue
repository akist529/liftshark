<template>
    <div>
        <h1>My Routines</h1>
        <select name="day" id="day" @change="updateActiveDay" ref="day">
            <option
                v-for="day of weekdays"
                :value="day"
                :key="day"
            >{{ day }}</option>
        </select>
        <NewButton>
          <button>
            <span>New Routine</span>
          </button>
          <button>
            <img alt="More" :src="assetspath('./ui/expand_less.webp')" />
          </button>
        </NewButton>
        <MyRoutine v-for="routine in routines"
          :routine="routine"
          :exercises="exercises"
          :key="routine.id"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NewButton from '@/components/buttons/NewButton.vue'
import MyRoutine from '@/components/MyRoutine.vue'
import { fetchImages } from '@/mixins/fetchImages'
import { Exercise } from '@/types/index'
import axios from 'axios'
import Cookies from 'js-cookie'

export default defineComponent({
  data () {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const activeDay = 'Sunday'
    const routines: any[] = []
    const exercises: Exercise[] = []

    return {
      weekdays,
      activeDay,
      routines,
      exercises
    }
  },
  methods: {
    updateActiveDay () {
      this.activeDay = (this.$refs.day as HTMLSelectElement).value
    }
  },
  components: {
    NewButton,
    MyRoutine
  },
  mixins: [fetchImages],
  created () {
    axios.get('http://localhost:1337/api/routines', {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
      .then(response => {
        this.routines = response.data
      }).catch(error => {
        console.log(error)
      })

    axios.get('https://wger.de/api/v2/exercise?limit=999&language=2')
      .then(response => {
        this.exercises = response.data
      })
  }
})
</script>

<style scoped lang="scss">
</style>
