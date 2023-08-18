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
// Local components
import FilterModal from '@/components/modals/ExercisesView/FilterModal.vue';

export default defineComponent({
    data () {
        return ({
            windowStore: useWindowStore(),
            exerciseStore: useExerciseStore()
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
