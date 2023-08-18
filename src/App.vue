<template>
<v-app>
	<MobileLayout
		v-if="windowStore.width < 600"
	/>
	<TabletLayout
		v-if="windowStore.width >= 600 && windowStore.width < 992"
	/>
	<DesktopLayout
		v-if="windowStore.width >= 992"
	/>
	<v-snackbar
		top
		v-model="snackbarStore.open"
		:timeout="2000"
		:color="snackbarStore.color"
	>
		<v-icon
			:icon="snackbarStore.icon"
		></v-icon>
		{{ snackbarStore.text }}
		<template
			v-slot:actions
		>
			<v-btn
				flat
				color="white"
				@click="snackbarStore.open = false"
			>Close</v-btn>
		</template>
	</v-snackbar>
</v-app>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useLoginStore } from './stores/loginStore';
// Local components
import MobileLayout from './components/layouts/MobileLayout.vue';
import TabletLayout from './components/layouts/TabletLayout.vue';
import DesktopLayout from './components/layouts/DesktopLayout.vue';
// Pinia stores
import { useExerciseStore } from './stores/exerciseStore';
import { useRoutineStore } from '@/stores/routineStore';
import { useStatStore } from './stores/statStore';
import { useWorkoutStore } from './stores/workoutStore';
import { useWindowStore } from './stores/windowStore';
import { useSnackbarStore } from './stores/snackbarStore';

export default defineComponent({
	name: 'App',
	components: {
		MobileLayout,
		TabletLayout,
		DesktopLayout
	},
	data () {
		const exerciseStore = useExerciseStore();
		const routineStore = useRoutineStore();
		const statStore = useStatStore();
		const workoutStore = useWorkoutStore();
		const loginStore = useLoginStore();
		const windowStore = useWindowStore();
		const snackbarStore = useSnackbarStore();

		return ({
			exerciseStore,
			routineStore,
			statStore,
			workoutStore,
			loginStore,
			windowStore,
			snackbarStore
		});
	},
	mounted () {
		this.$nextTick(() => {
			window.addEventListener('resize', this.windowStore.resize);
		});
	},
	created () {
		this.exerciseStore.getFavorites();
		this.routineStore.getRoutineData();
		this.statStore.getStats();
		this.workoutStore.getWorkouts();
	}
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:500');
@import url('https://fonts.googleapis.com/css?family=Karla:300,500,700');

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

:root {
	--title-font: 'Roboto';
	--content-font: 'Karla';
	--button-bg-color: rgb(66, 103, 178);
	--button-bg-color-hover: rgb(84, 115, 177);
	--error-color: rgb(160, 0, 0);
}
</style>
