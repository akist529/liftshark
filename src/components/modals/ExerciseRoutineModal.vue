<template>
<v-dialog
    scrollable
    persistent
    v-model="dialog"
    class="ExerciseRoutineModal w-100 h-100"
    :max-width="windowStore.width >= 600 ? '400px' : '100%'"
>
    <template v-slot:activator="{ props }">
        <v-btn title="Add to Routine" v-bind="props">
            <v-icon
                icon="mdi-notebook"
                size="xx-large"
            ></v-icon>
        </v-btn>
    </template>
	<v-card class="d-flex justify-center align-center pa-2 rounded-lg bg-blue-grey-lighten-3 text-black">
		<v-card-title class="d-flex justify-center align-center w-100">
			<h1>Add Exercise to Routine</h1>
		</v-card-title>
		<v-card-actions class="d-flex flex-wrap justify-center align-center w-100" :style="{gap: '10px'}">
			<v-select
                v-model="routine"
                label="Select Routine"
                :items="routineStore.routines"
                :item-title="mappedNames"
                no-data-text="No routines available"
                return-object
                class="w-75"
            ></v-select>
            <v-btn
                @click="routineStore.updateRoutine(routine)"
                variant="flat"
                color="success"
            >Add to Routine</v-btn>
            <v-btn
                @click="dialog = false"
                variant="flat"
                color="error"
            >Close</v-btn>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia imports
import { useRoutineStore } from '@/stores/routineStore';
import { useWindowStore } from '@/stores/windowStore';
// Type interfaces
import { RoutineData } from '@/types/index';

export default defineComponent({
    data () {
        return ({
            routine: {} as RoutineData,
            routineStore: useRoutineStore(),
            windowStore: useWindowStore(),
            dialog: false
        });
    },
    methods: {
        mappedNames () {
            return this.routineStore.routines.map(function (routine: RoutineData) {
                return routine.attributes.name;
            });
        }
    }
})
</script>