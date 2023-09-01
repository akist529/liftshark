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
            icon="mdi-dumbbell"
        ></v-icon>
        My Exercises
    </v-toolbar-title>
    <template v-slot:extension>
        <v-spacer></v-spacer>
        <FilterModal
            :muscles="muscles"
            :equipment="equipment"
        />
    </template>
</v-toolbar>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useWindowStore } from '@/stores/windowStore';
import { useExerciseStore } from '@/stores/exerciseStore';
import { useModeStore } from '@/stores/modeStore';
// Local components
import FilterModal from '@/components/modals/ExercisesView/FilterModal.vue';

export default defineComponent({
    data () {
        return ({
            windowStore: useWindowStore(),
            exerciseStore: useExerciseStore(),
            modeStore: useModeStore()
        });
    },
    props: ['muscles', 'equipment'],
    components: {
        FilterModal
    }
})
</script>

<style scoped lang="scss">

</style>
