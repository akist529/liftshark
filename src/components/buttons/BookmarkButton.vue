<template>
<button
    :class="`BookmarkButton ${favorited ? 'favorited' : 'not-favorited'}`"
    @click="favorited ? exerciseStore.removeFromFavorites(id) : exerciseStore.addToFavorites(id)"
></button>
<v-btn>
    <v-icon icon="mdi-heart-plus"></v-icon>
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

<style scoped lang="scss">
.BookmarkButton {
    /* Positioning */
    display: flex;
        justify-content: center;
        align-items: center;

    /* Visual */
    background: #4267B2;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 15px;

    &::after {
        background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        width: 64px;
        height: 64px;
        content: '';
        filter: invert(1);
    }
}

.not-favorited {
    &::after {
        background-image: url('/public/images/icons/heart_plus.svg');
    }

    &:hover {
        &::after {
            filter: invert(65%) sepia(15%) saturate(6854%) hue-rotate(295deg) brightness(101%) contrast(102%);
        }
    }
}

.favorited {
    &::after {
        background-image: url('/public/images/icons/heart_check.svg');
    }
}
</style>
