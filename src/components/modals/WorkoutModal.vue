<template>
<ModalBackground>
<dialog class="WorkoutModal">
	<header>
		<h1>New Workout</h1>
		<span>{{ workoutStore.getDay }}, {{ workoutStore.getMonth }} {{ workoutStore.selectedDate }}, {{ workoutStore.selectedYear }}</span>
		<button class="btn-add-exercise">Add Exercise</button>
		<CloseButton
			@click="workoutStore.toggleWorkoutModal" />
	</header>
	<form v-if="exerciseQuery.isSuccess">
		<ExerciseForm v-for="exercise in exerciseCount"
			:key="exercise"
			:exercises="exerciseQuery.data.results"
			:count="exercise"
			@deleteExercise="deleteExercise($event)" />
	</form>
	<footer>
		<AddButton
			title="Add Workout"
			@click="exerciseCount++" />
	</footer>
</dialog>
</ModalBackground>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Type interfaces
import { ExerciseData } from '@/types/index';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
// Local components
import ModalBackground from '../ModalBackground.vue';
import CloseButton from '../buttons/CloseButton.vue';
import ExerciseForm from './WorkoutModal/ExerciseForm.vue';
import AddButton from '../buttons/AddButton.vue';

const getData = async (): Promise<ExerciseData> => {
	return await fetch('https://wger.de/api/v2/exercise?limit=999&language=2')
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
    data () {
        const workoutStore = useWorkoutStore();
		const exerciseQuery = useQuery('exercises', () => getData());
		const exerciseCount = 1;

        return ({
            workoutStore,
			exerciseQuery,
			exerciseCount
        });
    },
    components: {
        ModalBackground,
        CloseButton,
		ExerciseForm,
		AddButton
    },
	methods: {
		deleteExercise (e: MouseEvent) {
			e.preventDefault();

			if (this.exerciseCount > 1) {
				this.exerciseCount--;
			}
		}
	}
})
</script>

<style scoped lang="scss">
.WorkoutModal {
    /* Positioning */
	display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
		justify-items: center;
		align-items: center;
		gap: 10px;
	position: fixed;
		top: 50%;
		left: 50%;
	transform: translate(-50%, -50%);
	width: 90vw;
	height: 90vh;

	/* Visual */
	background-color: rgb(255, 255, 255);
	padding: 45px 15px 15px;
	border: none;
		border-radius: 20px;
	filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5));
	font-family: 'Karla';
	text-transform: uppercase;

	header {
		display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 5px;
		text-align: center;

		.btn-add-exercise {
			padding: 5px 10px;
			background: none;
			border: none;
			cursor: pointer;

			display: flex;
			justify-content: center;
			align-items: center;
			gap: 5px;
			font-size: 16px;
			text-transform: uppercase;
			font-weight: 700;

			&::after {
				display: inline-block;
				content: '';
				background-image: url('/public/images/icons/exercise.svg');
					background-repeat: no-repeat;
					background-size: contain;
					background-position: center;
				width: 24px;
				height: 24px;
			}
		}
	}

	form {
		overflow: scroll;
		height: 100%;
	}
}
</style>
