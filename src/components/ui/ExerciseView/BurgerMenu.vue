<template>
<div class="BurgerMenu">
    <BurgerMenuButton
        :image="'@/../public/images/ui/sidebar/routines.webp'"
    >Add to Routine</BurgerMenuButton>
    <BurgerMenuButton
        :image="'@/../public/images/ui/sidebar/workouts.webp'"
    >Add to Workout</BurgerMenuButton>
</div>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Local components
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
    position: fixed;
        bottom: 200px;
        left: 50%;
        transform: translateX(-50%) translateY(50%);
        z-index: 999;
}
</style>
