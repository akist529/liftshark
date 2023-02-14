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
          <button @click="newRoutine">
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
import { includeBooleanAttr } from '@vue/shared'

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
    },
    async newRoutine () {
      await fetch('http://localhost:1337/api/routines', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            day: 'Sunday'
          }
        })
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  components: {
    NewButton,
    MyRoutine
  },
  mixins: [fetchImages],
  async created () {
    await axios.get('http://localhost:1337/api/routines', {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
      .then(response => {
        this.routines = response.data.data
      }).catch(error => {
        console.log(error)
      })

    await axios.get('https://wger.de/api/v2/exercise?limit=999&language=2')
      .then(response => {
        this.exercises = response.data.results
      }).catch(error => {
        console.log(error)
      })
  }
})
</script>

<style scoped lang="scss">
</style>
