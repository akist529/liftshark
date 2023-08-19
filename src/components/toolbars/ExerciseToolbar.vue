<template>
<v-toolbar
    v-if="isLoaded && !isError && exercise.data && muscles.data && equipment.data"
    class="px-5 py-1"
    color="primary"
    density="compact"
    extended
>
    <v-toolbar-title
        class="flex text-center pa-0 ma-0"
    >
        {{ exercise.data.name }}
    </v-toolbar-title>
    <template v-slot:extension>
        <v-btn
            variant="plain"
            @click="$router.back()"
            class="pa-0 ma-0 d-flex justify-center align-center"
        >
            <v-icon
                icon="mdi-chevron-left"
                size="xxx-large"
            ></v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <ExerciseRoutineModal />
            <ExerciseWorkoutModal />
            <BookmarkButton
                :id="exercise.data.id" />
        </v-toolbar-items>
    </template>
</v-toolbar>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Local components
import ExerciseRoutineModal from '../modals/ExerciseRoutineModal.vue';
import ExerciseWorkoutModal from '../modals/ExerciseWorkoutModal.vue';
import BookmarkButton from '../buttons/BookmarkButton.vue';

export default defineComponent({
    components: {
        ExerciseRoutineModal,
        ExerciseWorkoutModal,
        BookmarkButton
    },
    props: ['exercise', 'muscles', 'equipment', 'isLoaded', 'isError']
})
</script>