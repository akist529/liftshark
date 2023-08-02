<template>
<v-carousel-item class="rounded-xl h-100">
    <v-toolbar flat dense>
        <v-toolbar-title>
            <span class="text-subheading">{{ name ? name : 'Exercise ' + count }}</span>
        </v-toolbar-title>
        <DeleteButton
            @click="$emit('deleteExercise', $event)" />
    </v-toolbar>
    <v-card-text class="bg-blue-grey-darken-2 overflow-y-auto h-100">
        <v-select
            clearable
            label="Exercise"
            :id="`exercise-${count}-name`"
            :name="`exercise-${count}-name`"
            :placeholder="exercises[0].name"
            :items="exercises.map(exercise => exercise.name)"
            v-model="name"
        ></v-select>
        <v-row>
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
        </v-row>
        <v-container class="d-flex flex-wrap justify-center align-center">
            <SetForm v-for="set in setCount"
                :key="set"
                :exerciseCount="count"
                :setCount="set" />
        </v-container>
    </v-card-text>
</v-carousel-item>
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

        return ({
            workoutStore,
            setCount,
            name,
            tickLabels
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
