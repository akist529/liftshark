// Pinia imports
import { defineStore } from 'pinia';
import { useSnackbarStore } from './snackbarStore';
// Type interfaces
import { RoutineData, Routine, Entry } from '@/types/index';
// Third-party libraries
import Cookies from 'js-cookie';

const token: string = Cookies.get('token');

export const useRoutineStore = defineStore('routineStore', {
    state: () => ({
        snackbarStore: useSnackbarStore(),
        routines: <RoutineData[]>[],
        activeDay: new Date().getDay(),
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        loading: false,
        entries: [
            {
				key: 0,
				name: '2 Handed Kettlebell Swing',
				sets: [
					{
						key: 0,
						reps: 1,
						weight: 0
					}
				]
			}
        ] as Entry[],
        tab: 0
    }),
    getters: {
        recordedDays: (state) => {
            return state.weekdays.filter((day: string) => {
                return state.routines.find((routine: RoutineData) => routine.attributes.day === day);
            })
        },
        activeDayRoutines: (state) => {
            return state.routines.filter((routine: RoutineData) => {
                return routine.attributes.day === state.weekdays[state.activeDay];
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
        async updateRoutine (newRoutine: RoutineData) {
            const routine = this.routines.find((routine: RoutineData) => routine.id === newRoutine.id);

            if (routine) {
                if (token) {
                    await fetch(`http://localhost:1337/api/routines/${routine.id}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${Cookies.get('token')}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            data: newRoutine.attributes
                        })
                    }).then(response => {
                        console.log(response);
                    }).catch(error => {
                        console.log(error);
                    });
                } else {
                    const localRoutines: RoutineData[] = JSON.parse(localStorage.getItem('routines') || '[]');

                    for (let i = 0; i < localRoutines.length; i++) {
                        if (localRoutines[i].id === newRoutine.id) {
                            localRoutines[i].attributes = newRoutine.attributes;
                        }
                    }

                    localStorage.setItem('routines', JSON.stringify(localRoutines));
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
        updateActiveDay (day: number) {
            this.activeDay = day;
        },
        async getRoutineData () {
            this.loading = true;

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
        },
        getRoutinesByDay (day: string) {
            return this.routines.filter(routine => routine.attributes.day === day);
        },
        deleteEntry (entry: Entry) {
			if (this.entries.length > 1) {
				this.entries.splice(entry.key, 1);

				for (let i = entry.key; i < this.entries.length; i++) {
					this.entries[i].key = this.entries[i].key - 1;
				}

				this.tab = this.tab - 1;

				if (this.tab < 0) {
					this.tab = 0;
				}
			} else {
				this.snackbarStore.text = 'Workout must include at least one exercise';
				this.snackbarStore.color = 'error';
				this.snackbarStore.icon = 'mdi-alert-circle';
				this.snackbarStore.open = true;
			}
		},
        addEntry () {
            if (this.entries.length < 20) {
				this.entries.push({
					key: this.entries.length,
					name: '2 Handed Kettlebell Swing',
					sets: [
						{
							key: 0,
							reps: 1,
							weight: 0
						}
					]
				} as Entry);
			} else {
				this.snackbarStore.text = 'Max number of exercises reached';
				this.snackbarStore.color = 'error';
				this.snackbarStore.icon = 'mdi-alert-circle';
				this.snackbarStore.open = true;
			}
        },
        updateSetCount (key: number, sets: number) {
			const oldCount = this.entries[key].sets.length;

			if (sets > oldCount) {
				for (let i = oldCount; i < sets; i++) {
					this.entries[key].sets.push({
						key: this.entries[key].sets.length,
						reps: 1,
						weight: 0
					});
				}
			} else {
				this.entries[key].sets = this.entries[key].sets.slice(0, sets);
			}
		},
        updateSet (entry: number, set: number, reps: number, weight: number) {
			this.entries[entry].sets[set].reps = reps;
			this.entries[entry].sets[set].weight = weight;
		}
    }
});
