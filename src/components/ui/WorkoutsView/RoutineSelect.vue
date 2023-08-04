<template>
<v-select
	name="routine"
	id="routine"
	ref="routine"
	v-model="name"
	:items="routineStore.routines.map(routine => routine.attributes.name)">
	<template v-slot:append>
		<v-btn
			title="Log Routine as Workout"
			@click="useRoutine"
		></v-btn>
	</template>
</v-select>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useRoutineStore } from '@/stores/routineStore';

export default defineComponent({
	data () {
		const workoutStore = useWorkoutStore();
		const routineStore = useRoutineStore();

		return ({
			workoutStore,
			routineStore,
			name: ''
		});
	},
    methods: {
        async useRoutine () {
			const routine = this.routineStore.getRoutineByName(this.name);

			if (routine) {
				this.workoutStore.addWorkout({
					date: new Date(this.workoutStore.selectedYear as number, this.workoutStore.selectedMonth as number, this.workoutStore.selectedDate as number, 0).toISOString().split('T')[0],
					entries: routine.attributes.entries
				});
			}
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
