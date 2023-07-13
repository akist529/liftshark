import { defineStore } from 'pinia';
import { Routine } from '@/types/index';

export const useRoutineStore = defineStore('routineStore', {
    state: () => ({
        routines: <Routine[]>[]
    }),
    getters: {
        routines: (state) => {
            return state.routines;
        },
        sunday: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === 'Sunday';
            });
        },
        monday: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === 'Monday';
            });
        },
        tuesday: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === 'Tuesday';
            });
        },
        wednesday: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === 'Wednesday';
            });
        },
        thursday: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === 'Thursday';
            });
        },
        friday: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === 'Friday';
            });
        },
        saturday: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === 'Saturday';
            });
        }
    },
    actions: {
        addRoutine (routine: Routine) {
            this.routines.push(routine);
        },
        deleteRoutine (idToDelete: number) {
            this.routines = this.routines.filter((routine: Routine) => {
                return routine.id !== idToDelete;
            });
        },
        updateRoutine (updatedRoutine: Routine) {
            const filteredRoutines = this.routines.filter((routine: Routine) => routine.id !== updatedRoutine.id);
            filteredRoutines.push(updatedRoutine);
            this.routines = filteredRoutines;
        }
    }
});
