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
            text="Add to Routine"
        >
            <template
                v-slot:activator="{ props: tooltip }"
            >
                <v-btn
                    v-bind="mergeProps(dialog, tooltip)"
                    @click="checkRoutines"
                >
                    <v-icon
                        icon="mdi-notebook"
                        size="xx-large"
                    ></v-icon>
                </v-btn>
            </template>
        </v-tooltip>
    </template>
	<v-card
        :class="modeStore.darkMode ? 'bg-blue-grey-darken-3 d-flex justify-center align-center pa-2 rounded-lg' : 'bg-blue-grey-lighten-3 d-flex justify-center align-center pa-2 rounded-lg'"
    >
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
                @click="checkInput"
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
import { useModeStore } from '@/stores/modeStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
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
            modeStore: useModeStore(),
            snackbarStore: useSnackbarStore(),
            dialog: false
        });
    },
    methods: {
        mappedNames () {
            return this.routineStore.routines.map(function (routine: RoutineData) {
                return routine.attributes.name;
            });
        },
        checkInput () {
            if (!Object.keys(this.routine).length) {
                this.snackbarStore.text = 'No routine selected!';
                this.snackbarStore.color = 'error';
                this.snackbarStore.icon = 'mdi-alert-circle';
                this.snackbarStore.open = true;
            } else {
                this.routineStore.updateRoutine(this.routine);
            }
        },
        checkRoutines () {
            if (!this.routineStore.routines.length) {
                this.snackbarStore.text = 'No routines available!';
                this.snackbarStore.color = 'error';
                this.snackbarStore.icon = 'mdi-alert-circle';
                this.snackbarStore.open = true;
                this.dialog = false;
            }
        },
        mergeProps
    },
    components: {
        CloseButton
    }
})
</script>
