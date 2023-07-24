<template>
<button
    :class="`BookmarkButton ${favorited ? 'favorited' : 'not-favorited'}`"
    @click="favorited ? removeFromFavorites(id) : addToFavorites(id)"
></button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useExerciseStore } from '@/stores/exerciseStore';

export default defineComponent({
    data () {
        const exerciseStore = useExerciseStore();

        return ({
            favoriteExercises: exerciseStore.favorited,
            addToFavorites: exerciseStore.addToFavorites,
            removeFromFavorites: exerciseStore.removeFromFavorites,
            id: this.exerciseId as number
        });
    },
    props: ['exerciseId'],
    computed: {
        favorited () {
            const isFavorited = this.favoriteExercises.find((id: number) => id === this.exerciseId);

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
    background: none;
    border: none;
    cursor: pointer;

    &::after {
        background-size: contain;
            background-repeat: no-repeat;
        width: 64px;
        height: 64px;
        content: '';
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
        background-image: url('/public/images/icons/favorite.svg');
        filter: invert(65%) sepia(15%) saturate(6854%) hue-rotate(295deg) brightness(101%) contrast(102%);
    }
}
</style>
