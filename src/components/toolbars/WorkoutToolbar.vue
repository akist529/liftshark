<template>
<v-toolbar
    class="px-5 py-1"
    color="primary"
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
    <template
        v-slot:extension
    >
        <span>Actions</span>
        <v-toolbar-items
            class="w-100 d-flex justify-space-evenly align-center"
        >
            <v-btn
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
                    v-if="windowStore.width >= 400"
                >Back</span>
            </v-btn>
            <CalendarModal />
            <v-btn
                variant="plain"
                @click="workoutStore.changeDateForward">
                <span v-if="windowStore.width >= 400">Forward</span>
                <template v-slot:append>
                    <v-icon icon="mdi-chevron-right" size="xxx-large"></v-icon>
                </template>
            </v-btn>
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

export default defineComponent({
    data () {
        return ({
            workoutStore: useWorkoutStore(),
            windowStore: useWindowStore()
        });
    },
    components: {
        AddRoutineModal,
        AddWorkoutModal,
        CalendarModal
    }
})
</script>
