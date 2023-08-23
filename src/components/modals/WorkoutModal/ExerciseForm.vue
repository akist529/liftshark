<template>
<v-window-item
    :value="count"
>
    <v-card>
        <v-card-actions>
            <v-container>
                <v-row>
                    <v-col :cols="10">
                        <v-select
                            label="Exercise"
                            :id="`exercise-${count}-name`"
                            :name="`exercise-${count}-name`"
                            :placeholder="exercises[0].name"
                            :items="exercises.map(exercise => exercise.name)"
                            v-model="name"
                        ></v-select>
                    </v-col>
                    <v-col
                        :cols="2"
                        class="d-flex justify-center align-center"
                    >
                        <DeleteButton
                            @click="$emit('deleteExercise', $event)"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col :cols="12">
                        <v-slider
                            v-model="setCount"
                            :id="`exercise-${count}-setCount`"
                            :name="`exercise-${count}-setCount`"
                            :step="1"
                            :min="1"
                            :max="6"
                            label="Sets"
                            show-ticks="always"
                            tick-size="6"
                            :ticks="tickLabels"
                            prepend-icon="mdi-weight-lifter">
                        </v-slider>
                    </v-col>
                </v-row>
                <v-row
                    class="d-flex flex-wrap justify-center align-center"
                >
                    <v-col
                        :cols="4"
                        v-for="set in setCount"
                        :key="set"
                    >
                        <SetForm
                            :exerciseCount="count"
                            :setCount="set"
                        />
                    </v-col>
                </v-row>
            </v-container>
        </v-card-actions>
    </v-card>
</v-window-item>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Type interfaces
import { Exercise } from '@/types/index';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
// Local components
import SetForm from '@/components/modals/WorkoutModal/SetForm.vue';
import DeleteButton from '@/components/buttons/DeleteButton.vue';

export default defineComponent({
    data () {
        const workoutStore = useWorkoutStore();
        const setCount = 1;
        const name = '';
        const tickLabels = ({
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6'
        });
        const entry = ({
            name: '',
            sets: []
        });

        return ({
            workoutStore,
            setCount,
            name,
            tickLabels,
            entry
        });
    },
    props: {
        exercises: {
            type: Array as PropType<Exercise[]>,
            required: true
        },
        count: {
            type: Number as PropType<number>,
            required: true
        }
    },
    components: {
        SetForm,
        DeleteButton
    }
})
</script>
