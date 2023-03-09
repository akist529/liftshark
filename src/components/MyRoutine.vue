<template>
    <div class="routine-entries">
        <MyRoutineEntry v-for="entry in entries"
          :key="entry.id"
          :routine="routine"
          :entry="entry"
          :exercises="exercises"
          @updateRoutine="$emit('updateRoutine')"
        />
        <NewButton @clicked="newEntry()">
          <slot>Add Exercise</slot>
        </NewButton>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Routine, Entry, Exercise } from '@/types/index'
import MyRoutineEntry from '@/components/MyRoutineEntry.vue'
import NewButton from '@/components/buttons/NewButton.vue'
import Cookies from 'js-cookie'

export default defineComponent({
  data () {
    const entries: Entry[] = []

    return {
      entries
    }
  },
  components: {
    MyRoutineEntry,
    NewButton
  },
  props: {
    routine: Object as PropType<Routine>,
    exercises: Array as PropType<Exercise[]>
  },
  methods: {
    async newEntry () {
      await fetch(`http://localhost:1337/api/routines/${this.routine?.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            day: this.routine?.attributes.day,
            exercises: [...this.entries, {
              id: this.entries.length,
              name: '2 Handed Kettlebell Swing',
              sets: [
                {
                  weight: 0,
                  reps: 0
                }
              ]
            }
            ]
          }
        })
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })

      await this.getEntries()
    },
    async getEntries () {
      await fetch(`http://localhost:1337/api/routines/${this.routine?.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        return response.json()
      }).then(data => {
        this.entries = data.data.attributes.exercises
      }).catch(error => {
        console.log(error)
      })
    }
  },
  async created () {
    await this.getEntries()
  }
})
</script>
