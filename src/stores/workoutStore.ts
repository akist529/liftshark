// Pinia imports
import { defineStore } from 'pinia';
// Type interfaces
import { Workout } from '@/types/index';
// Third-party libraries
import Cookies from 'js-cookie';

const token: string = Cookies.get('token');

export const useWorkoutStore = defineStore('workoutStore', {
    state: () => ({
        workouts: <Workout[]>[],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        selectedDate: new Date().getDate(),
        selectedMonth: new Date().getMonth(),
        selectedYear: new Date().getFullYear(),
        calendarOpen: false,
        loading: false,
        date: new Date(),
        modalOpen: false
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
            return state.workouts.filter((workout: Workout) => {
                return workout.attributes.date === new Date(state.selectedYear, state.selectedMonth, state.selectedDate, 0).toISOString().split('T')[0];
            });
        },
        getToday: (state) => {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const date = today.getDate();

            return state.workouts.filter((workout: Workout) => {
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
        toggleWorkoutModal () {
            this.modalOpen = !this.modalOpen;
        },
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
        async addWorkout (workout: any) {
            if (token) {
                await fetch('http://localhost:1337/apis/workouts', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: workout
                    })
                });
            } else {
				const localWorkouts: Workout[] = JSON.parse(localStorage.getItem('workouts') || '[]');

				localWorkouts.push({
					id: JSON.parse(localStorage.getItem('workouts') || '[]').length,
					attributes: workout
				});

				localStorage.setItem('workouts', JSON.stringify(localWorkouts));
            }

            this.getWorkouts();
        },
        async deleteWorkout (idToDelete: number) {
            const updatedWorkouts = this.workouts.filter((workout: Workout) => {
                return workout.id !== idToDelete;
            });

            this.workouts = updatedWorkouts;

            if (token) {
				await fetch('http://localhost:1337/apis/workouts', {
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
                        data: {
                            updatedWorkouts
                        }
					})
				});
			} else {
				localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
			}

            this.getWorkouts();
        },
        async updateWorkout (updatedWorkout: Workout) {
            const filteredWorkouts = this.workouts.filter((workout: Workout) => workout.id !== updatedWorkout.id);
            filteredWorkouts.push(updatedWorkout);
            this.workouts = filteredWorkouts;

            if (token) {
                await fetch('http://localhost:1337/apis/workouts', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: {
                            filteredWorkouts
                        }
                    })
                });
            } else {
                localStorage.setItem('workouts', JSON.stringify(filteredWorkouts));
            }

            this.getWorkouts();
        },
        async getWorkouts () {
            this.loading = true;

            if (token) {
				await fetch('http://localhost:1337/api/workouts', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
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
                const localRoutines: Workout[] = JSON.parse(localStorage.getItem('workouts') || '[]');
                this.workouts = localRoutines;
            }

            this.loading = false;
        }
    }
});
