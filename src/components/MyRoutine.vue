<template>
    <div class="routine-entries">
        <MyRoutineEntry v-for="entry in entries"
          :key="entry"
          :exercises="exercises"
          @updateRoutine="$emit('updateRoutine')"
        />
        <button>Add Exercise</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Exercise } from '@/types/index'
import MyRoutineEntry from '@/components/MyRoutineEntry.vue'

export default defineComponent({
  data () {
    const entries: any[] = []

    return {
      entries
    }
  },
  components: {
    MyRoutineEntry
  },
  props: {
    routine: Object,
    exercises: Array as PropType<Exercise[]>
  }
})
</script>
