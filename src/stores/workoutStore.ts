import { defineStore } from 'pinia';
import { Workout } from '@/types/index';

export const useWorkoutStore = defineStore('workoutStore', {
    state: () => ({
        workouts: <Workout[]>[]
    }),
    getters: {
        workouts: (state) => {
            return state.workouts;
        },
        today: (state) => {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();
            const date = today.getDate();

            return state.workouts.filter((workout: Workout) => {
                return workout.attributes.date === `${year}-${month}-${date}`;
            });
        }
    },
    actions: {
        addWorkout (workout: Workout) {
            this.workouts.push(workout);
        },
        deleteWorkout (idToDelete: number) {
            this.workouts = this.workouts.filter((workout: Workout) => {
                return workout.id !== idToDelete;
            });
        },
        updateWorkout (updatedWorkout: Workout) {
            const filteredWorkouts = this.workouts.filter((workout: Workout) => workout.id !== updatedWorkout.id);
            filteredWorkouts.push(updatedWorkout);
            this.workouts = filteredWorkouts;
        }
    }
});
