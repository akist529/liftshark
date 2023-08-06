<template>
<main class="WorkoutsView w-100">
	<h1>My Workouts</h1>
	<v-row class="d-flex justify-center">
		<v-col cols="3" class="d-flex justify-center">
			<v-btn
				variant="plain"
				@click="workoutStore.changeDateBack">
				<template v-slot:prepend>
					<v-icon icon="mdi-chevron-left" size="xxx-large"></v-icon>
				</template>
				<span v-if="windowStore.width >= 600">Back</span>
			</v-btn>
		</v-col>
		<v-col cols="6" class="d-flex justify-center">
			<CalendarModal />
		</v-col>
		<v-col cols="3" class="d-flex justify-center">
			<v-btn
				variant="plain"
				@click="workoutStore.changeDateForward">
				<span v-if="windowStore.width >= 600">Forward</span>
				<template v-slot:append>
					<v-icon icon="mdi-chevron-right" size="xxx-large"></v-icon>
				</template>
			</v-btn>
		</v-col>
	</v-row>
	<v-row v-if="routineStore.routines.length" class="d-flex flex-wrap justify-center align-center">
		<v-col>
			<v-select
				name="routine"
				id="routine"
				ref="routine"
				v-model="routineName"
				label="Select Routine"
				:items="routineStore.routines.map(routine => routine.attributes.name)">
			</v-select>
			<v-btn
				title="Log Routine as Workout"
				@click="useRoutine"
				append-icon="mdi-notebook"
			>Log Routine as Workout</v-btn>
		</v-col>
	</v-row>
	<v-row v-if="workoutStore.workouts.length">
		<v-col v-for="workout in workoutStore.activeWorkouts" :key="workout.id">
			<WorkoutLog
				:workout="workout" />
		</v-col>
	</v-row>
	<WorkoutModal
		@showSnackBar="showSnackBar = true" />
</main>
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
// Mixins
import { fetchImages } from '@/mixins/fetchImages';
// Local components
import WorkoutLog from '@/components/ui/WorkoutsView/WorkoutLog.vue';
import WorkoutModal from '@/components/modals/WorkoutModal.vue';
import CalendarModal from '@/components/modals/CalendarModal.vue';
// Type interfaces
import { Workout } from '@/types/index';

export default defineComponent({
	data () {
		const userToken = Cookies.get('token');
		const workoutStore = useWorkoutStore();
		const routineStore = useRoutineStore();
		const windowStore = useWindowStore();

		return ({
			workoutStore,
			routineStore,
			windowStore,
			months: workoutStore.months,
			userToken,
			showSnackBar: false,
			routineName: ''
		});
	},
	components: {
		WorkoutLog,
		WorkoutModal,
		CalendarModal
	},
	mixins: [fetchImages],
	methods: {
		updateUserToken () {
			if (this.userToken !== Cookies.get('token')) {
				this.userToken = Cookies.get('token');
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

<style scoped lang="scss">
.WorkoutsView {
	h1 {
		display: flex;
			justify-content: center;
			align-items: center;
			gap: 10px;

		&::after {
			display: inline-block;
			content: '';
			width: 64px;
			height: 64px;
			background-image: url('/public/images/icons/exercise.webp');
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center;
		}
	}
}
</style>
