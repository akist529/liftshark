<template>
    <div>
        <button @click="deleteEntry">DELETE</button>
        <select name="exercise" ref="name" @change="updateEntry()">
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
            value="1"
            @change="updateEntry()"
            ref="setCount"
        /><span> sets</span>
        <div v-for="set in entry?.sets" :key="set.id">
            <input
              type="number"
              min="1"
              max="100"
              value="1"
              :ref="`repCount-${set.id}`"
              @change="updateEntry()"
            />
            <span> reps</span>
            <input
              type="number"
              min="1"
              max="500"
              value="1"
              :ref="`weight-${set.id}`"
              @change="updateEntry()"
            />
            <span> lbs.</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { fetchData } from '@/mixins/fetchData'
import { Routine, Entry, Exercise, Set } from '@/types/index'
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
          console.log('ENTRY DELETED:', response)
        }).catch(error => {
          console.log('ENTRY DELETE FAILED:', error)
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
      }

      this.$emit('getEntries')
    },
    async updateEntry () {
      const updatedEntries: Entry[] = []

      this.routine?.attributes.exercises?.forEach(exercise => {
        if (exercise.id === this.entry?.id) {
          const updatedSets: Set[] = []

          /*
          this.entry?.sets.forEach(set => {
            updatedSets.push({
              id: set.id,
              weight: Number((this.$refs[`weight-${set.id}`] as HTMLInputElement)[0].value as string),
              reps: Number((this.$refs[`repCount-${set.id}`] as HTMLInputElement)[0].value as string)
            })
          })
          */

          for (let i = 0; i < Number((this.$refs.setCount as HTMLInputElement).value); i++) {
            if (this.entry?.sets[i]) {
              updatedSets.push({
                id: this.entry?.sets[i].id,
                weight: Number((this.$refs[`weight-${this.entry?.sets[i].id}`] as HTMLInputElement)[0].value as string),
                reps: Number((this.$refs[`repCount-${this.entry?.sets[i].id}`] as HTMLInputElement)[0].value as string)
              })
            }
          }

          updatedEntries.push({
            id: this.entry?.id,
            name: (this.$refs.name as HTMLSelectElement).value,
            sets: updatedSets
          })
        } else {
          updatedEntries.push(exercise)
        }
      })

      if (Cookies.get('token')) {
        await fetch(`http://localhost:1337/api/routines/${this.routine?.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              day: this.routine?.attributes.day,
              exercises: updatedEntries
            }
          })
        }).then(response => {
          console.log('ENTRY UPDATE SUCCESSFUL:', response)
        }).catch(error => {
          console.log('ENTRY UPDATE FAILED:', error)
        })
      } else {
        const currentStorage: Routine[] = JSON.parse(localStorage.getItem('routines') || '[]')
        const newStorage: Routine[] = []

        for (let i = 0; i < currentStorage.length; i++) {
          if (currentStorage[i].id === this.routine?.id) {
            newStorage.push({
              id: currentStorage[i].id,
              attributes: {
                name: currentStorage[i].attributes.name,
                day: (this.routine?.attributes.day || 'Sunday'),
                exercises: updatedEntries
              }
            })
          } else {
            newStorage.push(currentStorage[i])
          }
        }

        localStorage.setItem('routines', JSON.stringify(newStorage))
      }

      this.$emit('getEntries')
    }
  }
})
</script>
