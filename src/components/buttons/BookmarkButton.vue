<template>
<v-btn
    class="rounded-circle"
    width="64"
    height="64"
    @click="favorited ? exerciseStore.removeFromFavorites(id) : exerciseStore.addToFavorites(id)">
    <v-icon
        :icon="favorited ? 'mdi-heart-plus' : 'mdi-heart'"
        size="xxx-large"
    ></v-icon>
</v-btn>
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
            exerciseStore,
            id: this.exerciseId
        });
    },
    props: {
        exerciseId: {
            type: Object as PropType<number>,
            required: true
        }
    },
    computed: {
        favorited () {
            const isFavorited = this.exerciseStore.favorited.find((id: number) => id === this.exerciseId);

            if (isFavorited) return true;
                else return false;
        }
    }
});
</script>
