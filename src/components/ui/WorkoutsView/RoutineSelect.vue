<template>
<div class="RoutineSelect">
    <select
		name="routine"
		id="routine"
		ref="routine"
		v-model="routineId">
		<optgroup v-for="day in routineStore.recordedDays" :key="day" :label="day">
			<option v-for="routine in routinesOfDay(day)"
				class="routine-option"
				:value="routine.id"
				:key="routine.id"
				:id="routine.id.toString()"
			>{{ getOptionName(routine.attributes.name) }}</option>
		</optgroup>
	</select>
    <SubmitButton
        title="Log Routine as Workout"
        @click="useRoutine()" />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useRoutineStore } from '@/stores/routineStore';
// Local components
import SubmitButton from '@/components/buttons/SubmitButton.vue';

export default defineComponent({
	data () {
		const workoutStore = useWorkoutStore();
		const routineStore = useRoutineStore();
		const routineId = 0;

		return ({
			workoutStore,
			routineStore,
			routineId
		});
	},
    components: {
        SubmitButton
    },
    methods: {
        async useRoutine () {
			this.workoutStore.addWorkout({
				date: new Date(this.workoutStore.selectedYear as number, this.workoutStore.selectedMonth as number, this.workoutStore.selectedDate as number, 0).toISOString().split('T')[0],
				routine: this.routineId
			});
		},
        routinesOfDay (day: string) {
			return this.routineStore.routines.filter(routine => {
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

<style scoped lang="scss">
.RoutineSelect {
	display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;

	select {
		background-image: url('/public/images/icons/expand_more.svg'),
			linear-gradient(to left, var(--button-bg-color) 0px, var(--button-bg-color) 30px, white 30px, white 100%);
			background-repeat: no-repeat, repeat;
			background-position: right 10px top 50%, 0 0;
			background-size: .65em auto, 100%;
		padding: 0 5px;
		font-size: 18px;
		appearance: none;
		cursor: pointer;
		width: 224px;
	}
}
</style>
