<template>
<div class="MyRoutine">
	<DeleteRoutineButton
		@click="$emit('deleteRoutine, this.routine.id')" />
	<label for="name">Routine Name</label>
	<input v-model="name"
		id="name"
		@change="updateRoutineName()" />
	<MyRoutineEntry v-for="entry in entries"
		:key="entry.id"
		:routine="routine"
		:entry="entry"
		:exercises="exercises"
		@getEntries="getEntries()" />
	<AddButton
		itemAdded="exercise"
		@clicked="newEntry()">
		<slot>Add Exercise</slot>
	</AddButton>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cookies from 'js-cookie';
import { Routine, Entry, Exercise } from '@/types/index';
// Local components
import MyRoutineEntry from '@/components/ui/RoutinesView/MyRoutine/MyRoutineEntry.vue';
import AddButton from '@/components/buttons/AddButton.vue';
import DeleteRoutineButton from './MyRoutine/DeleteRoutineButton.vue';

export default defineComponent({
	data () {
		const entries: Entry[] = [];
		const name = this.routine?.attributes.name || 'New Routine';

		return ({
			entries,
			name
		});
	},
	components: {
		MyRoutineEntry,
		AddButton,
		DeleteRoutineButton
	},
	props: {
		routine: Object as PropType<Routine>,
		exercises: Array as PropType<Exercise[]>
	},
	methods: {
		async newEntry () {
			const newEntries: Entry[] = this.entries || [];

			newEntries.push({
				id: this.entries.length,
				name: '2 Handed Kettlebell Swing',
				sets: [
					{
						id: 0,
						weight: 0,
						reps: 0
					}
				]
			});

			if (Cookies.get('token')) {
				await fetch(`http://localhost:1337/api/routines/${this.routine?.id}`, {
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						data: {
							day: this.routine?.attributes.day,
							exercises: newEntries
						}
					})
				}).then(response => {
					console.log(response);
				}).catch(error => {
					console.log(error);
				});
			} else {
				const prevRoutines = JSON.parse(localStorage.getItem('routines') || '[]');

				for (let i = 0; i < prevRoutines.length; i++) {
					if (prevRoutines[i].id === this.routine?.id) {
						prevRoutines[i].attributes.exercises = newEntries;
					}
				}

				localStorage.setItem('routines', JSON.stringify(prevRoutines));
			}

			await this.getEntries();
		},
		async getEntries () {
			if (Cookies.get('token')) {
				await fetch(`http://localhost:1337/api/routines/${this.routine?.id}`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					}
				}).then(response => {
					return response.json();
				}).then(data => {
					this.entries = data.data.attributes.exercises || [];
				}).catch(error => {
					console.log(error);
				});
			} else {
				JSON.parse(localStorage.getItem('routines') || '[]').forEach(routine => {
					if (routine.id === this.routine?.id) {
						this.entries = routine.attributes.exercises || [];
					}
				});
			}

			this.$emit('getUserRoutines');
		},
		async getSetCount (entryID: number) {
			let keyLength = 0;

			if (Cookies.get('token')) {
				keyLength = await fetch(`http://localhost:1337/api/routines/${this.routine?.id}`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					}
			}).then(response => {
				return response.json();
			}).then(data => {
				if (data.data.attributes.exercises.length) {
					for (const entry of data.data.attributes.exercises) {
						if (entry.id === entryID) {
							return entry.sets.length || 0;
						}
					}
				} else {
					return 0;
				}
			}).catch(error => {
				console.log(error);
			});
			} else {
				const currentStorage = JSON.parse(localStorage.getItem('routines') || '[]');

				for (let i = 0; i < currentStorage.length; i++) {
					if (currentStorage[i].id === this.routine?.id) {
						for (const entry of (currentStorage[i].attributes.exercises || [])) {
							if (entry.id === entryID) {
								keyLength = entry.sets.length;
							}
						}
					}
				}
			}

			return keyLength;
		},
		async updateRoutineName () {
			if (Cookies.get('token')) {
				await fetch(`http://localhost:1337/api/routines/${this.routine?.id}`, {
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						data: {
							day: this.routine?.attributes.day,
							name: this.name,
							exercise: this.routine?.attributes.exercises
						}
					})
				});
			} else {
				const oldRoutines: Routine[] = JSON.parse(localStorage.getItem('routines') || '[]');
				const newRoutines: Routine[] = [];

				for (const routine of oldRoutines) {
					if (routine.id === this.routine?.id) {
						newRoutines.push({
							id: routine.id,
							attributes: {
								day: this.routine?.attributes.day,
								name: this.name,
								exercises: this.routine?.attributes.exercises
							}
						});
					} else {
						newRoutines.push(routine);
					}
				}

				localStorage.setItem('routines', JSON.stringify(newRoutines));
			}
		}
	},
	async created () {
		await this.getEntries();
	}
});
</script>

<style lang="scss">
.MyRoutine {
	/* Positioning */
	display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	position: relative;

	/* Visual */
	padding: 20px;
	background-color: rgb(206, 206, 206);
}
</style>
