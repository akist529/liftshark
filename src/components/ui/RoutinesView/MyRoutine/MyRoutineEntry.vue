<template>
<li class="routine-entry">
	<div class="entry-header">
		<select name="exercise" ref="name" @change="updateEntry()">
			<option v-for="exercise in exercises"
				:value="exercise.name"
				:key="exercise.name"
				:selected="exercise.name === entry?.name? true : false"
			>{{ exercise.name }}</option>
		</select>
		<div class="entry-setcount">
			<input
				id="setCount"
				type="number"
				min="1"
				max="6"
				v-model="setCount"
				@change="updateEntry()"
				ref="setCount"
			/><span> sets</span>
		</div>
		<button class="entry-delete" @click="deleteEntry"></button>
	</div>
	<div v-for="set in entry?.sets" :key="set.key" class="entry-set">
		<div class="set-reps">
			<input
				type="number"
				min="1"
				max="100"
				:value="set.reps || 1"
				:ref="`repCount-${set.key}`"
				@change="updateEntry()" />
			<span> reps</span>
		</div>
		<div class="set-weight">
			<input
				type="number"
				min="1"
				max="500"
				:value="set.weight || 1"
				:ref="`weight-${set.key}`"
				@change="updateEntry()" />
			<span> lbs.</span>
		</div>
	</div>
</li>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Third-party libraries
import Cookies from 'js-cookie';
// Type interfaces
import { Routine, Entry, Set, Exercise } from '@/types/index';
// Pinia stores
import { useRoutineStore } from '@/stores/routineStore';

export default defineComponent({
	data () {
		const setCount = this.entry?.sets.length;
		const routineStore = useRoutineStore();

		return ({
			setCount,
			routineStore
		});
	},
	props: {
		routine: {
			type: Object as PropType<Routine>,
			required: true
		},
		entry: {
			type: Object as PropType<Entry>,
			required: true
		},
		exercises: {
			type: Array as PropType<Exercise[]>,
			required: true
		}
	},
	watch: {
		setCount (newSetCount) {
			if (newSetCount < 1) {
				this.setCount = 1;
			} else if (newSetCount > 6) {
				this.setCount = 6;
			}
		}
	},
	methods: {
		async deleteEntry () {
			const entries = this.routine?.attributes.entries?.filter((entry: Entry) => entry.key !== this.entry?.key);

			this.routineStore.updateRoutine(
				this.routine?.id || 0,
				this.routine?.attributes.name || '',
				this.routine?.attributes.day || this.routineStore.activeDay,
				entries || []
			);
		},
		async updateEntry () {
			const updatedEntries: Entry[] = [];

			this.routine?.attributes.entries?.forEach(exercise => {
				if (exercise.key === this.entry?.key) {
					const updatedSets: Set[] = [];

					for (let i = 0; i < (this.setCount || 0); i++) {
						if (this.entry?.sets[i]) {
							updatedSets.push({
								key: this.entry?.sets[i].key,
								weight: Number((this.$refs[`weight-${this.entry?.sets[i].key}`] as HTMLInputElement)[0].value as string),
								reps: Number((this.$refs[`repCount-${this.entry?.sets[i].key}`] as HTMLInputElement)[0].value as string)
							});
						} else {
							updatedSets.push({
								key: i,
								weight: 0,
								reps: 0
							});
						}
					}

					updatedEntries.push({
						key: this.entry?.key,
						name: (this.$refs.name as HTMLSelectElement).value,
						sets: updatedSets
					});
				} else {
					updatedEntries.push(exercise);
				}
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
							name: this.routine?.attributes.name,
							day: this.routine?.attributes.day,
							exercises: updatedEntries
						}
					})
				}).then(response => {
					console.log('ENTRY UPDATE SUCCESSFUL:', response);
				}).catch(error => {
					console.log('ENTRY UPDATE FAILED:', error);
				});
			} else {
				const currentStorage: Routine[] = JSON.parse(localStorage.getItem('routines') || '[]');
				const newStorage: Routine[] = [];

				for (let i = 0; i < currentStorage.length; i++) {
					if (currentStorage[i].id === this.routine?.id) {
						newStorage.push({
							id: currentStorage[i].id,
							attributes: {
								name: currentStorage[i].attributes.name,
								day: (this.routine?.attributes.day || 'Sunday'),
								entries: updatedEntries
							}
						});
					} else {
						newStorage.push(currentStorage[i]);
					}
				}

				localStorage.setItem('routines', JSON.stringify(newStorage));
			}

			this.$emit('getEntries');
		}
	}
});
</script>

<style lang="scss">
.routine-entry {
	/* Positioning */
	display: flex;
		flex-direction: column;
		gap: 10px;

	/* Visual */
	padding: 10px;
	border: 2px solid rgb(161, 161, 161);
		border-radius: 10px;
	background-color: rgb(230, 230, 230);

	.entry-header {
		display: grid;
			grid-template-columns: 1fr auto auto;
			gap: 10px;

		select {
			text-overflow: ellipsis;
			cursor: pointer;
		}

		.entry-setcount {
			display: flex;
				justify-content: center;
				align-items: center;
				gap: 5px;

			input {
				width: 32px;
				text-align: center;
			}
		}

		.entry-delete {
			background: none;
			border: none;
			cursor: pointer;

			&::after {
				display: block;
				content: '';
				width: 16px;
				height: 16px;
				background-image: url('/public/images/icons/delete.svg');
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
			}

			&:hover {
				filter: invert(16%) sepia(84%) saturate(5402%) hue-rotate(1deg) brightness(98%) contrast(126%);
			}
		}
	}

	.entry-set {
		display: flex;
			justify-content: space-around;
			align-items: center;

		input {
			width: 48px;
			text-align: center;
		}

		.set-reps,
		.set-weight {
			display: flex;
				justify-content: center;
				align-items: center;
				gap: 10px;
		}
	}
}
</style>
