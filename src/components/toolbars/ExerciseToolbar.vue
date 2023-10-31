<template>
<v-toolbar
    class="px-5 py-1"
    :color="modeStore.darkMode ? 'blue-grey-darken-4' : 'blue-lighten-3'"
    density="compact"
    extended
>
    <v-toolbar-title
        class="flex text-center pa-0 ma-0"
    >
        <VSkeletonLoader
            v-if="exercise.isLoading || exercise.isFetching"
            type="list-item-avatar"
            color="transparent"
        ></VSkeletonLoader>
        <span
            v-else-if="exercise.isSuccess && exercise.data"
        >{{ exercise.data.name }}</span>
    </v-toolbar-title>
    <template v-slot:extension>
        <v-tooltip text="Back to Exercises">
            <template v-slot:activator="{ props }">
                <v-btn
                    v-bind="props"
                    variant="plain"
                    @click="$router.back()"
                    class="pa-0 ma-0 d-flex justify-center align-center"
                >
                    <v-icon
                        icon="mdi-chevron-left"
                        size="xxx-large"
                    ></v-icon>
                </v-btn>
            </template>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <AddMaxModal />
            <ExerciseRoutineModal />
            <ExerciseWorkoutModal />
            <BookmarkButton
                v-if="exercise.isSuccess && exercise.data"
                :id="exercise.data.id" />
        </v-toolbar-items>
    </template>
</v-toolbar>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Vuetify imports
import { VSkeletonLoader } from 'vuetify/lib/labs/components.mjs';
// Local components
import ExerciseRoutineModal from '../modals/ExerciseRoutineModal.vue';
import ExerciseWorkoutModal from '../modals/ExerciseWorkoutModal.vue';
import AddMaxModal from '../modals/ExerciseView/AddMaxModal.vue';
import BookmarkButton from '../buttons/BookmarkButton.vue';
// Pinia stores
import { useModeStore } from '@/stores/modeStore';

export default defineComponent({
    data () {
        return ({
            modeStore: useModeStore()
        });
    },
    components: {
        ExerciseRoutineModal,
        ExerciseWorkoutModal,
        AddMaxModal,
        BookmarkButton,
        VSkeletonLoader
    },
    props: ['exercise', 'muscles', 'equipment', 'isLoaded', 'isError']
});
</script>
