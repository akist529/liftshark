<template>
<v-tooltip
    :text="isFavorited ? 'Remove from Favorites' : 'Add to Favorites'"
>
    <template
        v-slot:activator="{ props }"
    >
        <v-btn
            v-bind="props"
            :title="isFavorited ? 'Remove from Favorites' : 'Add to Favorites'"
            @click="isFavorited ? exerciseStore.removeFromFavorites(id) : exerciseStore.addToFavorites(id)">
            <v-icon
                :icon="isFavorited ? 'mdi-heart' : 'mdi-heart-plus'"
                size="xx-large"
                :color="isFavorited ? 'pink' : ''"
            ></v-icon>
        </v-btn>
    </template>
</v-tooltip>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Pinia stores
import { useExerciseStore } from '@/stores/exerciseStore';

export default defineComponent({
    data () {
        const exerciseStore = useExerciseStore();

        return ({
            exerciseStore
        });
    },
    props: {
        id: {
            type: Number as PropType<number>,
            required: true
        }
    },
    computed: {
        isFavorited () {
            const isFavorited = this.exerciseStore.favorites.find(entry => entry.attributes.exercise_base === this.id);

            if (isFavorited) return true;
                else return false;
        }
    }
});
</script>
