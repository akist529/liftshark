import { defineStore } from 'pinia';
import { Routine, Entry } from '@/types/index';
import Cookies from 'js-cookie';

const token: string = Cookies.get('token');

export const useRoutineStore = defineStore('routineStore', {
    state: () => ({
        routines: <Routine[]>[],
        activeDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()],
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        loading: false,
        modalOpen: false
    }),
    getters: {
        recordedDays: (state) => {
            return state.weekdays.filter((day: string) => {
                return state.routines.find((routine: Routine) => routine.attributes.day === day);
            })
        },
        activeDayRoutines: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === state.activeDay;
            });
        },
        getSunday: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === 'Sunday';
            });
        },
        getMonday: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === 'Monday';
            });
        },
        getTuesday: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === 'Tuesday';
            });
        },
        getWednesday: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === 'Wednesday';
            });
        },
        getThursday: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === 'Thursday';
            });
        },
        getFriday: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === 'Friday';
            });
        },
        getSaturday: (state) => {
            return state.routines.filter((routine: Routine) => {
                return routine.attributes.day === 'Saturday';
            });
        }
    },
    actions: {
        toggleModal () {
            this.modalOpen = !this.modalOpen;
        },
        async addRoutine () {
            if (token) {
				await fetch('http://localhost:1337/api/routines', {
					method: 'POST',
					headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json'
					},
					body: JSON.stringify({
                        data: {
                            name: 'New Routine',
                            day: this.activeDay,
                            exercises: []
                        }
					})
				}).then(response => {
					console.log(response);
				}).catch(error => {
					console.log(error);
				});
			} else {
				const localRoutines: Routine[] = JSON.parse(localStorage.getItem('routines') || '[]');

				localRoutines.push({
					id: JSON.parse(localStorage.getItem('routines') || '[]').length,
					attributes: {
						name: 'New Routine',
						day: this.activeDay,
						exercises: []
					}
				});

				localStorage.setItem('routines', JSON.stringify(localRoutines));
            }

            this.getRoutineData();
        },
        async updateRoutine (id: number, name: string, day: string, exercises: Entry[]) {
            const routine = this.routines.find((routine: Routine) => routine.id === id);

            if (routine) {
                if (Cookies.get('token')) {
                    await fetch(`http://localhost:1337/api/routines/${id}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${Cookies.get('token')}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            data: {
                                name: name,
                                day: day,
                                exercises: exercises
                            }
                        })
                    }).then(response => {
                        console.log(response);
                    }).catch(error => {
                        console.log(error);
                    });
                } else {
                    const routines = this.routines;

                    for (let i = 0; i < routines.length; i++) {
                        if (routines[i].id === id) {
                            routines[i].attributes = ({
                                name: name,
                                day: day,
                                exercises: exercises
                            });
                        }
                    }

                    localStorage.setItem('routines', JSON.stringify(routines));
                }
            }
        },
        async deleteRoutine (idToDelete: number) {
            const updatedRoutines = this.routines.filter((routine: Routine) => {
                return routine.id !== idToDelete;
            });

            this.routines = updatedRoutines;

            if (token) {
				await fetch('http://localhost:1337/apis/routines', {
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
                        data: {
                            updatedRoutines
                        }
					})
				});
			} else {
				localStorage.setItem('routines', JSON.stringify(updatedRoutines));
			}

            this.getRoutineData();
        },
        updateActiveDay (day: string) {
            this.activeDay = day;
        },
        async getRoutineData () {
            this.loading = true;

            const activeDay = this.weekdays[new Date().getDay()];
            this.activeDay = activeDay;

            if (token) {
				await fetch('http://localhost:1337/api/routines', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					}
					}).then(response => {
						return response.json();
					}).then(data => {
						this.routines = data.data;
					}).catch(error => {
						console.log(error);
					});
            } else {
                const localRoutines: Routine[] = JSON.parse(localStorage.getItem('routines') || '[]');
                this.routines = localRoutines;
            }

            this.loading = false;
        },
        getRoutineById (id: number) {
            const routine = this.routines.find((routine: Routine) => routine.id === id);

            if (routine) return routine;
                else return null;
        }
    }
});
