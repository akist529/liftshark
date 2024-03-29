<template>
<v-toolbar
    class="px-5 py-1"
    :color="modeStore.darkMode ? 'blue-grey-darken-4' : 'blue-lighten-3'"
    density="compact"
    extended
>
    <v-toolbar-title
        class="flex align-center text-center"
    >
        <v-icon
            icon="mdi-weight-lifter"
        ></v-icon>
        My Workouts
    </v-toolbar-title>
    <template v-slot:extension>
        <v-toolbar-items
            class="w-100 d-flex justify-space-evenly align-center"
        >
            <v-tooltip
                text="Change Date Back"
                :open-delay="500"
            >
                <template v-slot:activator="{ props }">
                    <v-btn
                        v-bind="props"
                        v-if="windowStore.width >= 420"
                        class="d-flex justify-center align-center"
                        variant="plain"
                        @click="workoutStore.changeDateBack">
                        <template
                            v-slot:prepend
                        >
                            <v-icon
                                icon="mdi-chevron-left"
                                size="xxx-large"
                            ></v-icon>
                        </template>
                        <span
                            v-if="windowStore.width >= 600"
                        >Back</span>
                    </v-btn>
                </template>
            </v-tooltip>
            <CalendarModal />
            <v-tooltip
                text="Change Date Forward"
                :open-delay="500"
            >
                <template
                    v-slot:activator="{ props }"
                >
                    <v-btn
                        v-if="windowStore.width >= 420"
                        v-bind="props"
                        class="d-flex justify-center align-center"
                        variant="plain"
                        @click="workoutStore.changeDateForward">
                        <span v-if="windowStore.width >= 600">Forward</span>
                        <template v-slot:append>
                            <v-icon icon="mdi-chevron-right" size="xxx-large"></v-icon>
                        </template>
                    </v-btn>
                </template>
            </v-tooltip>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <AddRoutineModal
                @showSnackBar="$emit('showSnackBar')"
            />
            <AddWorkoutModal
                @showSnackBar="$emit('showSnackBar')"
            />
        </v-toolbar-items>
    </template>
</v-toolbar>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Local components
import AddRoutineModal from '../modals/WorkoutsView/AddRoutineModal.vue';
import AddWorkoutModal from '../modals/WorkoutsView/AddWorkoutModal.vue';
import CalendarModal from '../modals/CalendarModal.vue';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useWindowStore } from '@/stores/windowStore';
import { useModeStore } from '@/stores/modeStore';

export default defineComponent({
    data () {
        return ({
            workoutStore: useWorkoutStore(),
            windowStore: useWindowStore(),
            modeStore: useModeStore()
        });
    },
    components: {
        AddRoutineModal,
        AddWorkoutModal,
        CalendarModal
    }
})
</script>
