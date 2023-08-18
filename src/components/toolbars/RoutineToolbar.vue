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
            icon="mdi-notebook"
        ></v-icon>
        My Routines
    </v-toolbar-title>
    <template v-slot:extension>
        <v-tabs
            v-model="routineStore.activeDay"
            bg-color="primary"
            class="w-100 bg-primary"
            align-tabs="center"
            fixed-tabs
            show-arrows
            centered
            :stacked="windowStore.width < 992"
        >
            <RoutineTab
                v-for="(day, index) in routineStore.weekdays"
                :key="index"
                :day="day"
                :index="index"
                :value="index" />
        </v-tabs>
        <v-toolbar-items>
            <RoutineModal
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
import RoutineModal from '../../components/modals/RoutineModal.vue';
import RoutineTab from '../ui/RoutinesView/RoutineTab.vue';
// Pinia stores
import { useRoutineStore } from '@/stores/routineStore';
import { useWindowStore } from '@/stores/windowStore';

export default defineComponent({
    data () {
        return ({
            routineStore: useRoutineStore(),
            windowStore: useWindowStore()
        });
    },
    components: {
        RoutineModal,
        RoutineTab
    }
})
</script>
