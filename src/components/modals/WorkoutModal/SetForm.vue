<template>
<v-container class="mx-0 px-0">
    <v-row>
        <v-col
            cols="auto"
            class="my-auto"
        >
            <v-label>Set #{{ set.key + 1 }}</v-label>
        </v-col>
        <v-col>
            <v-sheet
                class="d-flex bg-blue-grey-darken-4"
            >
                <v-container class="pa-0">
                    <v-row class="px-0">
                        <v-col class="px-1">
                            <v-text-field
                                hide-details="auto"
                                density="compact"
                                type="number"
                                label="Count"
                                suffix="reps"
                                :min="1"
                                :max="100"
                                :v-model="modal === 'workout' ? workoutStore.entries[entry.key].sets[set.key].reps : routineStore.entries[entry.key].sets[set.key].reps"
                            ></v-text-field>
                        </v-col>
                        <v-col class="px-1">
                            <v-text-field
                                hide-details="auto"
                                density="compact"
                                type="number"
                                label="Weight"
                                suffix="lbs"
                                :min="0"
                                :max="1000"
                                :v-model="modal === 'workout' ? workoutStore.entries[entry.key].sets[set.key].weight : routineStore.entries[entry.key].sets[set.key].weight"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-sheet>
        </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Type imports
import { Entry, Set } from '@/types/index';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useRoutineStore } from '@/stores/routineStore';

export default defineComponent({
    data () {
        return ({
            workoutStore: useWorkoutStore(),
            routineStore: useRoutineStore()
        });
    },
    props: {
        entry: {
            type: Object as PropType<Entry>,
            required: true
        },
        set: {
            type: Object as PropType<Set>,
            required: true
        },
        modal: {
            type: String as PropType<string>,
            required: true
        }
    }
})
</script>
