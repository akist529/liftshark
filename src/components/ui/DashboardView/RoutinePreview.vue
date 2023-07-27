<template>
<div v-if="routine" class="RoutinePreview">
    <h3>{{ routine.attributes.name }}</h3>
    <ul v-if="routine.attributes.exercises">
        <li v-for="exercise in routine.attributes.exercises" :key="exercise.id">
            <h4>{{ exercise.name }}</h4>
            <ul v-if="exercise.sets">
                <li v-for="set in exercise.sets" :key="set.id">
                    <span>{{ set.reps }} reps</span>
                    <span>{{ set.weight }} lbs.</span>
                </li>
            </ul>
        </li>
    </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Routine } from '@/types/index';

export default defineComponent({
    props: {
        routine: Object as PropType<Routine>
    }
});
</script>

<style scoped lang="scss">
.RoutinePreview {
    background-color: rgb(152,152,152);
    padding: 10px;
    border: 2px solid rgb(0,0,0);
}
</style>
