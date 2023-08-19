<template>
<v-main class="bg-blue-lighten-4">
	<v-container
		fluid
		class="fill-height pa-0"
	>
		<v-row
			no-gutters
			class="ma-0 align-self-start w-100"
		>
			<v-col :cols="12">
				<WorkoutToolbar />
				<LoginBanner
					v-if="!token"
				/>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			class="w-100 ma-0 align-self-stretch"
		>
			<v-col
				:cols="12"
				class="d-flex justify-center align-center w-100 pa-5"
			>
				<v-list
					v-if="workoutStore.activeWorkouts.length"
					class="d-flex flex-wrap justify-center align-center"
				>
					<v-list-item
						v-for="workout in workoutStore.activeWorkouts"
						:key="workout.id"
					>
						<WorkoutCard
							:workout="workout"
							:preview="false" />
					</v-list-item>
				</v-list>
				<InfoAlert
					v-else
					title="No Workouts"
					text="You have no workouts on this date."
				/>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			class="ma-0 align-self-end"
		>
			<v-col :cols="12">
				<MyFooter />
			</v-col>
		</v-row>
	</v-container>
</v-main>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Third-party libraries
import Cookies from 'js-cookie';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useRoutineStore } from '@/stores/routineStore';
import { useWindowStore } from '@/stores/windowStore';
// Local components
import WorkoutCard from '@/components/cards/WorkoutCard.vue';
import LoginBanner from '@/components/banners/LoginBanner.vue';
import WorkoutToolbar from '@/components/toolbars/WorkoutToolbar.vue';
import MyFooter from '@/components/MyFooter.vue';
import InfoAlert from '@/components/alerts/InfoAlert.vue';
// Type interfaces
import { Workout } from '@/types/index';

export default defineComponent({
	data () {
		const workoutStore = useWorkoutStore();
		const routineStore = useRoutineStore();
		const windowStore = useWindowStore();

		return ({
			workoutStore,
			routineStore,
			windowStore,
			months: workoutStore.months,
			showSnackBar: false,
			routineName: '',
			token: Cookies.get('token')
		});
	},
	components: {
		WorkoutCard,
		LoginBanner,
		WorkoutToolbar,
		MyFooter,
		InfoAlert
	},
	methods: {
		updateUserToken () {
			if (this.token !== Cookies.get('token')) {
				this.token = Cookies.get('token');
			}
		},
		routinesOfDay (day: string) {
			return this.routineStore.routines.filter(routine => {
				return routine.attributes.day === day;
			});
		},
		useRoutine () {
			const routine = this.routineStore.getRoutineByName(this.routineName);

			if (routine) {
				const workout = ({
					date: this.workoutStore.date.toLocaleDateString('en-CA').split('T')[0],
					entries: routine.attributes.entries
				} as Workout);

				this.workoutStore.addWorkout(workout);
			}
		}
	},
	created () {
		window.setInterval(this.updateUserToken, 100); // Routinely check if user signs in or out
	}
})
</script>
