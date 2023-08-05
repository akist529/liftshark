<template>
<main class="WorkoutsView">
	<h1>My Workouts</h1>
	<v-row>
		<v-col>
			<v-btn
				variant="plain"
				title="Last Month"
				@click="workoutStore.changeDateBack">
				<v-icon
					icon="mdi-chevron-left"
					size="xxx-large"
				></v-icon>
			</v-btn>
		</v-col>
		<v-col>
			<CalendarModal />
		</v-col>
		<v-col>
			<v-btn
				variant="plain"
				title="Next Month"
				@click="workoutStore.changeDateForward">
				<v-icon
					icon="mdi-chevron-right"
					size="xxx-large"
				></v-icon>
			</v-btn>
		</v-col>
	</v-row>
	<v-row v-if="routineStore.routines.length">
		<v-col>
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
		</v-col>
	</v-row>
	<v-row v-if="workoutStore.workouts.length">
		<v-col>
			<WorkoutLog v-for="workout in workoutStore.workouts"
				:key="workout.id"
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
// Mixins
import { fetchImages } from '@/mixins/fetchImages';
// Local components
import WorkoutLog from '@/components/ui/WorkoutsView/WorkoutLog.vue';
import WorkoutModal from '@/components/modals/WorkoutModal.vue';
import CalendarModal from '@/components/modals/CalendarModal.vue';

export default defineComponent({
	data () {
		const userToken = Cookies.get('token');
		const workoutStore = useWorkoutStore();
		const routineStore = useRoutineStore();

		return ({
			workoutStore,
			routineStore,
			months: workoutStore.months,
			userToken,
			showSnackBar: false
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
