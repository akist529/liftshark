<template>
<select
    name="day"
    id="day"
    class="SelectDay"
    ref="day"
    @change="updateActiveDay()">
    <option v-for="day of routineStore.weekdays"
        :value="day"
        :key="day"
        :selected="isSelected(day)"
    >{{ day }}</option>
</select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoutineStore } from '@/stores/routineStore';

export default defineComponent({
    data () {
        const routineStore = useRoutineStore();

        return ({
            routineStore
        });
    },
    methods: {
        isSelected (day: string) {
            return day === this.routineStore.activeDay;
        },
        updateActiveDay () {
            this.routineStore.updateActiveDay((this.$refs.day as HTMLSelectElement).value);
        }
    }
});
</script>

<style lang="scss">
.SelectDay {
    background-image: url('/public/images/icons/expand_more.svg'), linear-gradient(to left, var(--button-bg-color) 0px, var(--button-bg-color) 30px, white 30px, white 100%);
	background-repeat: no-repeat, repeat;
		background-position: right 10px top 50%, 0 0;
		background-size: .65em auto, 100%;
	padding: 0 5px;
	width: 150px;
    font-size: 18px;
	appearance: none;
    cursor: pointer;
}
</style>
