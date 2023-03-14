<template>
    <div>
        <button @click="deleteEntry">DELETE</button>
        <select name="exercise" ref="name">
            <option v-for="exercise in exercises"
                :value="exercise.name"
                :key="exercise.name"
            >{{ exercise.name }}</option>
        </select>
        <input
            id="setCount"
            type="number"
            min="1"
            max="6"
            value="0"
            @change="updateSetCount"
            ref="setCount"
        /><span> sets</span>
        <div v-for="set in entry?.sets" :key="set.id">
            <input type="number" min="1" max="100" value="1" :ref="`repCount-${set}`" />
            <span> reps</span>
            <input type="number" min="1" max="500" value="1" :ref="`weight-${set}`" />
            <span> lbs.</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { fetchData } from '@/mixins/fetchData'
import { Routine, Entry, Exercise } from '@/types/index'
import Cookies from 'js-cookie'

export default defineComponent({
  props: {
    routine: Object as PropType<Routine>,
    entry: Object as PropType<Entry>,
    exercises: {
      type: Array as PropType<Exercise[]>
    }
  },
  mixins: [fetchData],
  methods: {
    filterEntries () {
      const filteredEntries: Entry[] = []

      this.routine?.attributes.exercises?.forEach(exercise => {
        if (exercise.id !== this.entry?.id) {
          filteredEntries.push(exercise)
        }
      })

      return filteredEntries
    },
    async deleteEntry () {
      if (Cookies.get('token')) {
        await fetch(`http://localhost:1337/api/routines/${this.routine?.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              day: this.routine?.attributes?.day,
              exercises: this.filterEntries()
            }
          })
        }).then(response => {
          console.log(response)
          this.$emit('updateRoutine')
        }).catch(error => {
          console.log(error)
        })
      } else {
        const routines = JSON.parse(localStorage.getItem('routines') || '[]')
        const newEntries = this.filterEntries()

        for (let i = 0; i < routines.length; i++) {
          if (routines[i].id === this.routine?.id) {
            routines[i].attributes.exercises = newEntries
          }
        }

        localStorage.setItem('routines', JSON.stringify(routines))
        this.$emit('updateRoutine')
      }
    },
    async updateEntry () {
      await fetch(`http://localhost:1337/api/routines/${this.routine?.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.entry?.id,
          name: this.$refs.name
        })
      })
    }
  }
})
</script>
