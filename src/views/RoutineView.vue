<template>
    <div class="RoutineView">
        <h1>My Routines</h1>
        <select
          name="day"
          id="day"
          class="ArrowDown"
          @change="updateActiveDay"
          :style="`background-image: url(${assetspath('./ui/expand_more.webp')}), linear-gradient(to left, var(--button-bg-color) 0px, var(--button-bg-color) 30px, white 30px, white 100%);`"
          ref="day">
            <option
                v-for="day of weekdays"
                :value="day"
                :key="day"
            >{{ day }}</option>
        </select>
        <NewButton>
          <button type="button" @click="newRoutine">
            <span>New Routine</span>
          </button>
          <button type="button">
            <img alt="More" :src="assetspath('./ui/expand_less.webp')" />
          </button>
        </NewButton>
        <MyRoutine v-for="routine in filterRoutines()"
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
import { Exercise, Routine } from '@/types/index'
import axios from 'axios'
import Cookies from 'js-cookie'

export default defineComponent({
  data () {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const activeDay = localStorage.getItem('activeDay') || 'Sunday'
    const routines: Routine[] = []
    const exercises: Exercise[] = []
    const userToken = Cookies.get('token')

    return {
      weekdays,
      activeDay,
      routines,
      exercises,
      userToken
    }
  },
  watch: {
    userToken () {
      if (!this.userToken) {
        this.getLocalRoutines()
      } else {
        this.getUserRoutines()
      }
    }
  },
  methods: {
    updateActiveDay () {
      localStorage.setItem('activeDay', (this.$refs.day as HTMLSelectElement).value)
      this.activeDay = localStorage.getItem('activeDay') || 'Sunday'
      console.log(this.filterRoutines())
    },
    async newRoutine () {
      if (Cookies.get('token')) {
        await fetch('http://localhost:1337/api/routines', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              day: this.activeDay
            }
          })
        }).then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error)
        })

        this.getUserRoutines()
      } else {
        const localRoutines: Routine[] = JSON.parse(localStorage.getItem('routines') || '[]')

        localRoutines.push({
          id: JSON.parse(localStorage.getItem('routines') || '[]').length,
          attributes: {
            day: this.activeDay
          }
        })

        localStorage.setItem('routines', JSON.stringify(localRoutines))
        this.getLocalRoutines()
      }
    },
    async getUserRoutines () {
      const response = await fetch('http://localhost:1337/api/routines', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        return response.json()
      }).then(data => {
        this.routines = data.data
      }).catch(error => {
        console.log(error)
      })
    },
    getLocalRoutines () {
      this.routines = JSON.parse(localStorage.getItem('routines') || '[]')
    },
    updateUserToken () {
      if (this.userToken !== Cookies.get('token')) {
        this.userToken = Cookies.get('token')
      }
    },
    filterRoutines () {
      return this.routines.filter(routine => {
        return routine.attributes.day === this.activeDay
      })
    }
  },
  components: {
    NewButton,
    MyRoutine
  },
  mixins: [fetchImages],
  async created () {
    if (Cookies.get('token')) {
      await this.getUserRoutines()
    } else {
      this.getLocalRoutines()
    }

    await axios.get('https://wger.de/api/v2/exercise?limit=999&language=2')
      .then(response => {
        this.exercises = response.data.results
      }).catch(error => {
        console.log(error)
      })

    window.setInterval(this.updateUserToken, 100)
  }
})
</script>

<style scoped lang="scss">
.RoutineView {
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    border: none;
    background-color: none;

    &:hover {
      background-color: none;
    }
  }

  #day {
    font-size: 18px;
    appearance: none;
  }
}

.ArrowDown {
  background-repeat: no-repeat, repeat;
  background-position: right 10px top 50%, 0 0;
  background-size: .65em auto, 100%;
  padding: 0 5px;
  width: 150px;
}
</style>
