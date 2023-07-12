<template>
<select
    name="routine"
    id="routine"
    class="SelectRoutine"
    ref="routine"
    :style="`background-image: url('/public/images/icons/expand_more.svg'), linear-gradient(to left, var(--button-bg-color) 0px, var(--button-bg-color) 30px, white 30px, white 100%);`">
    <optgroup v-for="day in ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']" :key="day" :label="day">
        <option v-for="routine in routinesOfDay(day)"
            class="routine-option"
            :value="routine.attributes.name"
            :key="routine.id"
            :id="routine.id.toString()"
        >{{ getOptionName(routine.attributes.name) }}</option>
    </optgroup>
</select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchRoutines } from '@/mixins/fetchRoutines';

export default defineComponent({
    mixins: [fetchRoutines],
    methods: {
        routinesOfDay (day: string) {
			return this.routines.filter(routine => {
				return routine.attributes.day === day;
			});
		},
        getOptionName (name: string) {
			if (name.length > 19) return `${name.slice(0, 18)}...`;
				else return name;
		}
    }
});
</script>

<style lang="scss">
.SelectRoutine {
    background-repeat: no-repeat, repeat;
        background-position: right 10px top 50%, 0 0;
        background-size: .65em auto, 100%;
    padding: 0 5px;
    width: 150px;

    font-size: 18px;
    appearance: none;
    width: 224px;
}
</style>
