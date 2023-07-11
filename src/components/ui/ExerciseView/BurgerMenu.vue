<template>
<div class="BurgerMenu">
    <BurgerMenuButton :image="'@/../public/images/ui/sidebar/routines.webp'">
        Add to Routine
    </BurgerMenuButton>
    <BurgerMenuButton :image="'@/../public/images/ui/sidebar/workouts.webp'">
        Add to Workout
    </BurgerMenuButton>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BurgerMenuButton from '@/components/ui/ExerciseView/BurgerMenuButton.vue';

export default defineComponent({
    components: {
        BurgerMenuButton
    }
});
</script>

<style scoped lang="scss">
.BurgerMenu {
    display: grid;
}
</style>
