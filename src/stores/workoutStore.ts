// Pinia imports
import { defineStore } from 'pinia';
// Type interfaces
import { WorkoutData, Workout } from '@/types/index';
// Third-party libraries
import Cookies from 'js-cookie';

const token: string = Cookies.get('token');

export const useWorkoutStore = defineStore('workoutStore', {
    state: () => ({
        workouts: [] as WorkoutData[],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        selectedDate: new Date().getDate(),
        selectedMonth: new Date().getMonth(),
        selectedYear: new Date().getFullYear(),
        calendarOpen: false,
        loading: false,
        date: new Date()
    }),
    getters: {
        getDay: (state) => {
            const day = new Date(state.selectedYear, state.selectedMonth, state.selectedDate).getDay();

            return state.days[day];
        },
        getMonth: (state) => {
            return state.months[state.selectedMonth];
        },
        activeWorkouts: (state) => {
            return state.workouts.filter((workout: WorkoutData) => {
                return workout.attributes.date === new Date(state.selectedYear, state.selectedMonth, state.selectedDate, 0).toISOString().split('T')[0];
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
        },
        firstDayInMonth: (state) => {
            return new Date(state.selectedYear, state.selectedMonth + 2, 1).getDay();
        },
        lastDateInPreviousMonth: (state) => {
            return new Date(state.selectedYear, state.selectedMonth, 0).getDate();
        },
        daysInMonth: (state) => {
            return new Date(state.selectedYear, state.selectedMonth + 1, 0).getDate();
        }
    },
    actions: {
        openCalendar () {
            this.calendarOpen = true;
        },
        closeCalendar () {
            this.calendarOpen = false;
        },
		changeDateBack () {
			this.selectedDate -= 1;
		},
		changeDateForward () {
			this.selectedDate += 1;
		},
        changeMonthBack () {
			const lastSeenMonth = this.selectedMonth;

			this.selectedMonth = ((this.selectedMonth += 12) - 1) % 12;

			if (this.selectedMonth > lastSeenMonth) this.selectedYear--;
		},
		changeMonthForward () {
			const lastSeenMonth = this.selectedMonth;

			this.selectedMonth = ((this.selectedMonth += 12) + 1) % 12;

			if (this.selectedMonth < lastSeenMonth) this.selectedYear++;
		},
        setSelectedDate (date: number) {
			this.selectedDate = date;
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

            const workouts = this.workouts.filter(workout => workout.id !== idToDelete);

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
