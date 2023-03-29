<template>
    <div class="workout-log">
        <DeleteButton title="Delete Workout" @click="$emit('deleteWorkout', workout.id)" />
        <span>{{ routine.attributes.name }}</span>
        <ul class="exercises">
            <table v-for="exercise in routine.attributes.exercises" :key="exercise.id" class="entry">
              <thead id="exercise-name">{{ exercise.name }}</thead>
              <tr id="exercise-headers">
                <th>SET</th>
                <th>REPS</th>
                <th>WEIGHT</th>
              </tr>
              <tr v-for="set in exercise.sets.length" :key="set" class="set">
                <td>{{ set }}</td>
                <td>{{ exercise.sets[set - 1].reps }}</td>
                <td>{{ exercise.sets[set - 1].weight }} lbs.</td>
              </tr>
            </table>
        </ul>
    </div>
</template>

<script scoped lang="ts">
import { defineComponent } from 'vue'
import { Routine } from '@/types/index'
import Cookies from 'js-cookie'
import DeleteButton from '@/components/buttons/DeleteButton.vue'

export default defineComponent({
  data () {
    const routine: Routine = {
      id: 0,
      attributes: {
        name: '',
        day: '',
        exercises: []
      }
    }

    return {
      routine
    }
  },
  components: {
    DeleteButton
  },
  props: ['workout'],
  async created () {
    if (Cookies.get('token')) {
      await fetch(`http://localhost:1337/apis/routines/${this.workout.attributes.routine}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        return response.json()
      }).then(data => {
        this.routine = data.data
      })
    } else {
      for (let i = 0; i < JSON.parse(localStorage.getItem('routines') || '[]').length; i++) {
        if (JSON.parse(localStorage.getItem('routines') || '[]')[i].id === this.workout.attributes.routine) {
          this.routine = JSON.parse(localStorage.getItem('routines') || '[]')[i]
        }
      }
    }
  }
})
</script>

<style lang="scss">
.workout-log {
    background-color: rgb(215, 215, 215);
    border: 3px solid rgb(175, 175, 175);
    padding: 35px 10px 10px;
    position: relative;

    .exercises {
        .entry {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(auto-fill, auto);

            #exercise-name {
              grid-column: 1 / -1;
              grid-row: 1 / 2;
            }

            #exercise-headers {
              grid-column: 1 / -1;
              grid-row: 2 / 3;

              display: grid;
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: auto;

              list-style-type: none;
            }

            .set {
              grid-column: 1 / -1;

              display: grid;
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: auto;
              justify-items: center;
            }
        }
    }
}
</style>
