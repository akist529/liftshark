<template>
<v-container
    class="bg-blue-grey-darken-4 pa-2 rounded-lg"
>
    <v-row>
        <v-col :cols="10" class="ma-0 pa-0">
            <v-select
                label="Exercise"
                :items="exercises.map(exercise => exercise.name)"
                :modelValue="name"
                @update:modelValue="newValue => updateName(newValue)"
            ></v-select>
        </v-col>
        <v-col
            :cols="2"
            class="my-0 pa-0"
        >
            <v-tooltip text="Delete Exercise">
                <template v-slot:activator="{ props }">
                    <DeleteButton
                        v-bind="props"
                        @click="modal === 'workout' ? workoutStore.deleteEntry(entry) : routineStore.deleteEntry(entry)"
                    />
                </template>
            </v-tooltip>
        </v-col>
    </v-row>
    <v-row>
        <v-col :cols="12" class="ma-0 pa-0">
            <v-slider
                :step="1"
                :min="1"
                :max="6"
                label="Sets"
                show-ticks="always"
                tick-size="6"
                :ticks="tickLabels"
                prepend-icon="mdi-weight-lifter"
                :modelValue="sets"
                @update:modelValue="newValue => updateSetCount(sets, newValue)"
            ></v-slider>
        </v-col>
    </v-row>
    <v-row
        v-for="set in entry.sets"
        :key="set.key"
        class="d-flex flex-wrap justify-center align-center"
    >
        <v-col
            :cols="12"
            class="my-0 py-0"
        >
            <SetForm
                :entry="entry"
                :set="set"
                :modal="modal"
            />
        </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Type interfaces
import { Exercise, Entry } from '@/types/index';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useRoutineStore } from '@/stores/routineStore';
import { useModeStore } from '@/stores/modeStore';
// Local components
import SetForm from '@/components/modals/WorkoutModal/SetForm.vue';
import DeleteButton from '@/components/buttons/DeleteButton.vue';

export default defineComponent({
    data () {
        const tickLabels = ({
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6'
        });

        return ({
            workoutStore: useWorkoutStore(),
            routineStore: useRoutineStore(),
            modeStore: useModeStore(),
            name: '2 Handed Kettlebell Swing',
            sets: 1,
            tickLabels
        });
    },
    props: {
        exercises: {
            type: Array as PropType<Exercise[]>,
            required: true
        },
        entry: {
            type: Object as PropType<Entry>,
            required: true
        },
        modal: {
            type: String as PropType<string>,
            required: true
        }
    },
    components: {
        SetForm,
        DeleteButton
    },
    methods: {
        updateName (name: string) {
            if (this.modal === 'workout') {
                this.workoutStore.entries[this.entry.key].name = name;
            } else {
                this.routineStore.entries[this.entry.key].name = name;
            }

            this.name = name;
        },
        updateSetCount (oldCount: number, newCount: number) {
            if (this.sets > newCount) {
                if (this.modal === 'workout') {
                    this.workoutStore.entries[this.entry.key].sets.slice(0, newCount);
                } else {
                    this.routineStore.entries[this.entry.key].sets.slice(0, newCount);
                }
            } else {
                for (let i = this.sets; i < newCount; i++) {
                    if (this.modal === 'workout') {
                        this.workoutStore.entries[this.entry.key].sets.push({
                            key: i,
                            reps: 1,
                            weight: 0
                        });
                    } else {
                        this.routineStore.entries[this.entry.key].sets.push({
                            key: i,
                            reps: 1,
                            weight: 0
                        });
                    }
                }
            }

            this.sets = newCount;
        }
    }
})
</script>
