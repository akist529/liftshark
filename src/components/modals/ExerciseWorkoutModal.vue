<template>
<v-dialog
    scrollable
    persistent
    v-model="dialog"
    :max-width="windowStore.width >= 600 ? '400px' : '100%'"
>
    <template
        v-slot:activator="{ props: dialog }"
    >
        <v-tooltip
            text="Add to Workout"
        >
            <template
                v-slot:activator="{ props: tooltip }"
            >
                <v-btn
                    v-bind="mergeProps(dialog, tooltip)"
                >
                    <v-icon
                        icon="mdi-dumbbell"
                        size="xx-large"
                    ></v-icon>
                </v-btn>
            </template>
        </v-tooltip>
    </template>
    <v-card
        :class="modeStore.darkMode ? 'bg-blue-grey-darken-3 d-flex justify-center align-center pa-2 rounded-lg' : 'bg-blue-grey-lighten-3 d-flex justify-center align-center pa-2 rounded-lg'"
    >
        <template
            v-slot:prepend
        >
            <v-icon
                icon="mdi-dumbbell"
            ></v-icon>
        </template>
        <template
            v-slot:title
        >
            Add Exercise to Workout
        </template>
        <v-card-actions
            class="d-flex flex-wrap justify-center align-center w-100"
            :style="{gap: '10px'}"
        >
            <v-select
                v-model="workout"
                label="Select Workout"
                :items="workoutStore.workouts"
                :item-title="mappedNames"
                no-data-text="No workouts available"
                return-object
                class="w-75"
            ></v-select>
            <v-btn
                @click="workoutStore.updateWorkout(workout)"
                variant="flat"
                color="success"
                prepend-icon="mdi-check"
            >Add to Workout</v-btn>
            <v-btn
                @click="dialog = false"
                variant="flat"
                color="error"
                prepend-icon="mdi-close"
            >Close</v-btn>
            <CloseButton
				@click="dialog = false" />
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, mergeProps } from 'vue';
// Pinia imports
import { useWorkoutStore } from '@/stores/workoutStore';
import { useWindowStore } from '@/stores/windowStore';
import { useModeStore } from '@/stores/modeStore';
// Type interfaces
import { WorkoutData } from '@/types/index';
// Local components
import CloseButton from '../buttons/CloseButton.vue';

export default defineComponent({
    data () {
        return ({
            workout: {} as WorkoutData,
            workoutStore: useWorkoutStore(),
            windowStore: useWindowStore(),
            modeStore: useModeStore(),
            dialog: false
        });
    },
    methods: {
        mappedNames () {
            return this.workoutStore.workouts.map(function (workout: WorkoutData) {
                return workout.attributes.date;
            });
        },
        mergeProps
    },
    components: {
        CloseButton
    }
})
</script>
