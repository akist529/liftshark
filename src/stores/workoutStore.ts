// Vue imports
import { ref } from 'vue';
// Pinia imports
import { defineStore } from 'pinia';
// Type interfaces
import { WorkoutData, Workout } from '@/types/index';
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
// Third-party libraries
import Cookies from 'js-cookie';

const token: string = Cookies.get('token');

export const useWorkoutStore = defineStore('workoutStore', {
    state: () => ({
        workouts: [] as WorkoutData[],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        calendarOpen: false,
        loading: false,
        date: ref(new Date()),
        dateVal: new Date().getDate(),
        dateString: new Date().toLocaleDateString('en-CA').split('T')[0],
        datepicker: ref<DatePickerInstance>(null)
    }),
    getters: {
        activeWorkouts: (state) => {
            return state.workouts.filter((workout: WorkoutData) => {
                return workout.attributes.date === state.dateString;
            });
        },
        getToday: (state) => {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const date = today.getDate();

            return state.workouts.filter((workout: WorkoutData) => {
                return workout.attributes.date === `${year}-${month}-${date}`;
            });
        }
    },
    actions: {
		changeDateBack () {
            const prevDate = this.date.getDate();
			const newDate = this.date;
            newDate.setDate(prevDate - 1);
            this.date = newDate;
            this.dateVal = newDate.getDate();
            this.dateString = newDate.toLocaleDateString('en-CA').split('T')[0];
		},
		changeDateForward () {
            const prevDate = this.date.getDate();
			const newDate = this.date;
            newDate.setDate(prevDate + 1);
            this.date = newDate;
            this.dateVal = newDate.getDate();
            this.dateString = newDate.toLocaleDateString('en-CA').split('T')[0];
		},
        async addWorkout (workout: Workout) {
            this.loading = true;

            if (token) {
                await fetch('http://localhost:1337/api/workouts', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: workout
                    })
                }).then(response => {
					console.log(response);
				}).catch(error => {
					console.log(error);
				});
            } else {
				const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');

				workouts.push({
					id: workouts.length,
					attributes: workout
				});

				localStorage.setItem('workouts', JSON.stringify(workouts));
            }

            this.getWorkouts();
        },
        async deleteWorkout (idToDelete: number) {
            this.loading = true;

            if (token) {
				await fetch(`http://localhost:1337/api/workouts/${idToDelete}`, {
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				}).then(response => {
					console.log(response);
				}).catch(error => {
					console.log(error);
				});
			} else {
                const workouts = this.workouts.filter(workout => workout.id !== idToDelete);

				localStorage.setItem('workouts', JSON.stringify(workouts));
			}

            this.getWorkouts();
        },
        async updateWorkout (workout: WorkoutData) {
            this.loading = true;

            const workouts = this.workouts.filter(storedWorkout => storedWorkout.id !== workout.id);
            workouts.push(workout);

            if (token) {
                await fetch('http://localhost:1337/api/workouts', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: {
                            workouts
                        }
                    })
                }).then(response => {
					console.log(response);
				}).catch(error => {
					console.log(error);
				});
            } else {
                localStorage.setItem('workouts', JSON.stringify(workouts));
            }

            this.getWorkouts();
        },
        async getWorkouts () {
            this.loading = true;

            if (token) {
				await fetch('http://localhost:1337/api/workouts', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
					}).then(response => {
						return response.json();
					}).then(data => {
						this.workouts = data.data;
					}).catch(error => {
						console.log(error);
					});
            } else {
                this.workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
            }

            this.loading = false;
        }
    }
});
