<template>
<div class="RoutineSelect">
    <SelectRoutine />
    <SubmitButton
        title="Log Routine as Workout"
        @click="useRoutine()" />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cookies from 'js-cookie';
import { Workout } from '@/types/index';
// Mixins
import { fetchRoutines } from '@/mixins/fetchRoutines';
import { fetchWorkouts } from '@/mixins/fetchWorkouts';
// Local components
import SubmitButton from '@/components/buttons/SubmitButton.vue';
import SelectRoutine from '@/components/ui/WorkoutsView/RoutineSelect/SelectRoutine.vue';

export default defineComponent({
    mixins: [fetchRoutines, fetchWorkouts],
    inject: ['selectedYear', 'selectedMonth', 'selectedDate'],
    components: {
        SubmitButton,
		SelectRoutine
    },
    methods: {
        async useRoutine () {
			for (const routine of document.querySelectorAll('.routine-option')) {
				if ((routine as HTMLOptionElement).selected) {
					if (Cookies.get('token')) {
						await fetch('http://localhost:1337/api/workouts', {
							method: 'POST',
							headers: {
								Authorization: `Bearer ${Cookies.get('token')}`,
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								data: {
									date: new Date(this.selectedYear as number, this.selectedMonth as number, this.selectedDate as number, 0).toISOString().split('T')[0],
									routine: Number((routine as HTMLOptionElement).id)
								}
							})
						}).then(response => {
							console.log(response);
						}).catch(error => {
							console.log(error);
						});
					} else {
						const workouts: Workout[] = JSON.parse(localStorage.getItem('workouts') || '[]');
						workouts.push({
							id: JSON.parse(localStorage.getItem('workouts') || '[]').length,
							attributes: {
							date: new Date(this.selectedYear as number, this.selectedMonth as number, this.selectedDate as number, 0).toISOString().split('T')[0],
							routine: Number((routine as HTMLOptionElement).id)
							}
						});

						localStorage.setItem('workouts', JSON.stringify(workouts));
					}
				}
			}

			this.fetchWorkouts(this.selectedYear as number, this.selectedMonth as number, this.selectedDate as number);
		},
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

<style scoped lang="scss">
.RoutineSelect {
	display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;

	.ArrowDown {
		background-repeat: no-repeat, repeat;
			background-position: right 10px top 50%, 0 0;
			background-size: .65em auto, 100%;
		padding: 0 5px;
		width: 150px;
	}

	#routine {
		font-size: 18px;
		appearance: none;
		width: 224px;
	}
}
</style>
