<template>
<TopNavBar v-if="windowStore.width < 600" />
<router-view
	id="router-view"
	:key="$route.fullPath" />
<NavBar />
<v-snackbar top v-model="snackbarStore.open" :timeout="2000" :color="snackbarStore.color">
	<v-icon
		:icon="snackbarStore.icon"
	></v-icon>
	{{ snackbarStore.text }}
	<template v-slot:actions>
		<v-btn
			flat
			color="white"
			@click="snackbarStore.open = false"
		>Close</v-btn>
	</template>
</v-snackbar>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useLoginStore } from './stores/loginStore';
// Local components
import NavBar from '@/components/NavBar.vue';
import TopNavBar from '@/components/TopNavBar.vue';
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
		NavBar,
		TopNavBar
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

#app {
	display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
	overflow: hidden;
	position: relative;
	height: 100vh;

	#router-view {
		/* Positioning */
		grid-row: 2 / 3;
		grid-column: 1 / -1;
		overflow-x: hidden;
		overflow-y: scroll;
		position: relative;
			z-index: 2;

		/* Visual */
		font-family: var(--content-font);
	}
}

@media (width >= 600px) {
	#app {
		grid-template-columns: auto 1fr;
		grid-template-rows: 1fr;

		#router-view {
			grid-row: 1 / -1;
			grid-column: 2 / 3;
		}
	}
}

@media (width >= 992px) {
	#app {
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;

		#router-view {
			grid-row: 2 / 3;
			grid-column: 1 / -1;
		}
	}
}
</style>
