<template>
<v-dialog
    scrollable
    persistent
    v-model="dialog"
    class="ExerciseRoutineModal w-100 h-100"
    :max-width="windowStore.width >= 600 ? '400px' : '100%'"
>
    <template
        v-slot:activator="{ props: dialog }"
    >
        <v-tooltip
            text="Add to Routine"
        >
            <template
                v-slot:activator="{ props: tooltip }"
            >
                <v-btn
                    v-bind="mergeProps(dialog, tooltip)"
                >
                    <v-icon
                        icon="mdi-notebook"
                        size="xx-large"
                    ></v-icon>
                </v-btn>
            </template>
        </v-tooltip>
    </template>
	<v-card class="d-flex justify-center align-center pa-2 rounded-lg bg-blue-grey-lighten-3 text-black">
		<template v-slot:prepend>
            <v-icon
                icon="mdi-notebook"
            ></v-icon>
        </template>
        <template v-slot:title>
            Add Exercise to Routine
        </template>
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
                prepend-icon="mdi-check"
            >Add to Routine</v-btn>
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
import { useRoutineStore } from '@/stores/routineStore';
import { useWindowStore } from '@/stores/windowStore';
// Type interfaces
import { RoutineData } from '@/types/index';
// Local components
import CloseButton from '../buttons/CloseButton.vue';

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
        },
        mergeProps
    },
    components: {
        CloseButton
    }
})
</script>
