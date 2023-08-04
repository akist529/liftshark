<template>
<div v-if="routine" class="RoutinePreview">
    <h3>{{ routine.attributes.name }}</h3>
    <ul v-if="routine.attributes.entries">
        <li v-for="entry in routine.attributes.entries" :key="entry.key">
            <h4>{{ entry.name }}</h4>
            <ul v-if="entry.sets">
                <li v-for="set in entry.sets" :key="set.key">
                    <span>{{ set.reps }} reps</span>
                    <span>{{ set.weight }} lbs.</span>
                </li>
            </ul>
        </li>
    </ul>
</div>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Type interfaces
import { RoutineData } from '@/types/index';

export default defineComponent({
    props: {
        routine: {
            type: Object as PropType<RoutineData>,
            required: true
        }
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
