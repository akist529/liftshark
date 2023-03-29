<template>
    <div class="workout-log">
        <CloseButton title="Delete Workout" @click="$emit('deleteWorkout', workout.id)" />
        <span>{{ routine.attributes.name }}</span>
        <ul class="exercises">
            <li v-for="exercise in routine.attributes.exercises" :key="exercise.id" class="entry">
                <span>{{ exercise.name }}</span>
                <span>Set Count: {{ exercise.sets.length }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Routine } from '@/types/index'
import Cookies from 'js-cookie'
import CloseButton from '@/components/buttons/CloseButton.vue'

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
    CloseButton
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
    padding: 35px 10px 10px;
    position: relative;

    .exercises {
        .entry {
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
