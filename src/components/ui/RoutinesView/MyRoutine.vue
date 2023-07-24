<template>
<div :class="routineHidden ? 'MyRoutine hidden' : 'MyRoutine'">
	<button
		id="routine-hide"
		:style="{ backgroundImage: `url(images/icons/expand_${routineHidden ? 'more' : 'less'}.svg)` }"
		@click="routineHidden = !routineHidden"
	></button>
	<DeleteRoutineButton
		@click="routineStore.deleteRoutine(routine?.id || 0)" />
	<div class="routine-name">
		<span v-if="!editNameOpen" id="span-name">{{ name }}</span>
		<input v-if="editNameOpen" v-model="name"
			id="input-name"
			class="hidden"
			@change="updateRoutine()" />
		<button
			id="edit-name"
			:style="{ backgroundImage: `url(/images/icons/${editNameOpen ? 'done' : 'edit'}.svg)` }"
			@click="editNameOpen = !editNameOpen"
		></button>
	</div>
	<ul v-for="entry in routine?.attributes.exercises" :key="entry.id">
		<MyRoutineEntry
			:routine="routine"
			:entry="entry"
			:exercises="exercises" />
	</ul>
	<AddButton
		itemAdded="exercise"
		@clicked="newEntry()">
		<slot>Add Exercise</slot>
	</AddButton>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Routine, Exercise } from '@/types/index';
import { useRoutineStore } from '@/stores/routineStore';
// Local components
import MyRoutineEntry from '@/components/ui/RoutinesView/MyRoutine/MyRoutineEntry.vue';
import AddButton from '@/components/buttons/AddButton.vue';
import DeleteRoutineButton from './MyRoutine/DeleteRoutineButton.vue';

export default defineComponent({
	data () {
		const routineStore = useRoutineStore();
		const name = this.routine?.attributes.name || 'New Routine';
		const editNameOpen = false;
		const routineHidden = false;

		return ({
			routineStore,
			name,
			editNameOpen,
			routineHidden
		});
	},
	methods: {
		newEntry () {
			const newEntry = ({
				id: this.routine?.attributes.exercises?.length || 0,
				name: '2 Handed Kettlebell Swing',
				sets: [
					{
						id: 0,
						weight: 0,
						reps: 0
					}
				]
			});

			const entries = this.routine?.attributes.exercises || [];
			entries?.push(newEntry);

			this.routineStore.updateRoutine(
				this.routine?.id || 0,
				this.name || '',
				this.routine?.attributes.day || this.routineStore.activeDay,
				entries);
		},
		updateRoutine () {
			this.routineStore.updateRoutine(
				this.routine?.id || 0,
				this.name || '',
				this.routine?.attributes.day || this.routineStore.activeDay,
				this.routine?.attributes.exercises || []
			);
		}
	},
	components: {
		MyRoutineEntry,
		AddButton,
		DeleteRoutineButton
	},
	props: {
		routine: Object as PropType<Routine>,
		exercises: Array as PropType<Exercise[]>
	}
});
</script>

<style lang="scss">
.MyRoutine {
	/* Positioning */
	display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	position: relative;
	height: auto;

	/* Visual */
	padding: 20px;
	background-color: rgb(206, 206, 206);
	border-radius: 10px;
	border: 2px solid rgb(126, 126, 126);

	#routine-hide {
		display: flex;
			justify-content: center;
			align-items: center;
		background: none;
		border: none;
		cursor: pointer;
		position: absolute;
			top: 10px;
			left: 10px;
		padding: 5px;
		content: '';
		width: 32px;
		height: 32px;
		background-size: contain;
		background-repeat: no-repeat;

		&:hover {
			filter: invert(39%) sepia(19%) saturate(0%) hue-rotate(175deg) brightness(98%) contrast(111%);
		}
	}

	.routine-name {
		display: flex;
			justify-content: center;
			align-items: center;
			gap: 10px;

		#input-name {
			width: auto;
			text-align: center;
		}

		#edit-name {
			content: '';
			width: 16px;
			height: 16px;
			background: none;
				background-size: contain;
				background-repeat: no-repeat;
			border: none;
			cursor: pointer;

			&:hover {
				filter: invert(39%) sepia(19%) saturate(0%) hue-rotate(175deg) brightness(98%) contrast(111%);
			}
		}
	}

	ul {
		display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 10px;
	}
}

.hidden {
	overflow: hidden;
}
</style>
