// Pinia imports
import { defineStore } from 'pinia';
// Type interfaces
import { RoutineData, Routine, Entry } from '@/types/index';
// Third-party libraries
import Cookies from 'js-cookie';

const token: string = Cookies.get('token');

export const useRoutineStore = defineStore('routineStore', {
    state: () => ({
        routines: <RoutineData[]>[],
        activeDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()],
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        loading: false
    }),
    getters: {
        recordedDays: (state) => {
            return state.weekdays.filter((day: string) => {
                return state.routines.find((routine: RoutineData) => routine.attributes.day === day);
            })
        },
        activeDayRoutines: (state) => {
            return state.routines.filter((routine: RoutineData) => {
                return routine.attributes.day === state.activeDay;
            });
        },
        getSunday: (state) => {
            return state.routines.filter((routine: RoutineData) => {
                return routine.attributes.day === 'Sunday';
            });
        },
        getMonday: (state) => {
            return state.routines.filter((routine: RoutineData) => {
                return routine.attributes.day === 'Monday';
            });
        },
        getTuesday: (state) => {
            return state.routines.filter((routine: RoutineData) => {
                return routine.attributes.day === 'Tuesday';
            });
        },
        getWednesday: (state) => {
            return state.routines.filter((routine: RoutineData) => {
                return routine.attributes.day === 'Wednesday';
            });
        },
        getThursday: (state) => {
            return state.routines.filter((routine: RoutineData) => {
                return routine.attributes.day === 'Thursday';
            });
        },
        getFriday: (state) => {
            return state.routines.filter((routine: RoutineData) => {
                return routine.attributes.day === 'Friday';
            });
        },
        getSaturday: (state) => {
            return state.routines.filter((routine: RoutineData) => {
                return routine.attributes.day === 'Saturday';
            });
        }
    },
    actions: {
        async addRoutine (routine: Routine) {
            this.loading = true;

            if (token) {
				await fetch('http://localhost:1337/api/routines', {
					method: 'POST',
					headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
					},
					body: JSON.stringify({
                        data: routine
					})
				}).then(response => {
					console.log(response);
				}).catch(error => {
					console.log(error);
				});
			} else {
				const localRoutines = JSON.parse(localStorage.getItem('routines') || '[]');

				localRoutines.push({
					id: localRoutines.length,
					attributes: routine
				});

				localStorage.setItem('routines', JSON.stringify(localRoutines));
            }

            this.getRoutineData();
        },
        async updateRoutine (id: number, name: string, day: string, entries: Entry[]) {
            const routine = this.routines.find((routine: RoutineData) => routine.id === id);

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
                                entries: entries
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
                                entries: entries
                            });
                        }
                    }

                    localStorage.setItem('routines', JSON.stringify(routines));
                }
            }
        },
        async deleteRoutine (idToDelete: number) {
            const updatedRoutines = this.routines.filter((routine: RoutineData) => {
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
                const localRoutines: RoutineData[] = JSON.parse(localStorage.getItem('routines') || '[]');
                this.routines = localRoutines;
            }

            this.loading = false;
        },
        getRoutineById (id: number | undefined) {
            if (!id) return null;

            const routine = this.routines.find((routine: RoutineData) => routine.id === id);

            if (routine) return routine;
                else return null;
        },
        getRoutineByName (name: string) {
            if (!name) return null;

            const routine = this.routines.find(routine => routine.attributes.name === name);

            if (routine) return routine;
                else return null;
        }
    }
});
