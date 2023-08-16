<template>
<section
	class="RoutinesView"
>
	<v-toolbar
		color="primary"
		extended
	>
		<v-toolbar-title
			class="flex align-center text-center"
		>
			<v-icon
				icon="mdi-notebook"
			></v-icon>
			My Routines
		</v-toolbar-title>
		<template
			v-slot:extension
		>
			<v-tabs
				v-model="routineStore.activeDay"
				bg-color="primary"
				class="w-100"
				align-tabs="center"
				fixed-tabs
				show-arrows
			>
				<RoutineTab
					v-for="(day, index) in routineStore.weekdays"
					:key="index"
					:day="day"
					:index="index"
					:value="index" />
			</v-tabs>
		</template>
	</v-toolbar>
	<LoginBanner
		v-if="!token"
	/>
	<v-tabs
		v-if="windowStore.isTablet"
		v-model="routineStore.activeDay"
		bg-color="primary"
		direction="vertical"
	>
		<RoutineTab
			v-for="(day, index) in routineStore.weekdays"
			:key="index"
			:day="day"
			:index="index"
			:value="index"
		/>
	</v-tabs>
	<v-window
		v-model="routineStore.activeDay"
		class="d-flex justify-center align-center w-100 pa-5"
	>
		<v-window-item
			v-for="(day, index) in routineStore.weekdays"
			:key="index"
			:value="index"
		>
			<v-list
				v-if="routineStore.getRoutinesByDay(day).length"
				class="d-flex flex-wrap justify-center align-center"
			>
				<v-list-item
					v-for="routine in routineStore.getRoutinesByDay(day)"
					:key="routine.id"
				>
					<WorkoutCard
						:routine="routine"
						:preview="false"
					/>
				</v-list-item>
			</v-list>
			<v-alert
				v-else
				:max-width="650"
				border="start"
				border-color="red-accent-1"
				elevation="2"
				type="info"
				title="No Routines"
				:text="`You have no routines for ${day}.`"
			></v-alert>
		</v-window-item>
	</v-window>
	<RoutineModal
		@showSnackBar="showSnackBar = true" />
	<MyFooter />
</section>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Third-party libraries
import Cookies from 'js-cookie';
// Type interfaces
import { ExerciseData, RoutineData } from '@/types/index';
// Pinia stores
import { useRoutineStore } from '@/stores/routineStore';
import { useWindowStore } from '@/stores/windowStore';
// Local components
import RoutineModal from '@/components/modals/RoutineModal.vue';
import WorkoutCard from '@/components/cards/WorkoutCard.vue';
import RoutineTab from '@/components/ui/RoutinesView/RoutineTab.vue';
import LoginBanner from '@/components/banners/LoginBanner.vue';
import MyFooter from '@/components/MyFooter.vue';

const getData = async (): Promise<ExerciseData> => {
	return await fetch('https://wger.de/api/v2/exercise?limit=999&language=2')
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
	data () {
		const routineStore = useRoutineStore();
		const windowStore = useWindowStore();
		const userToken = Cookies.get('token');
		const exercises = useQuery('exercises', () => getData());

		return ({
			routineStore,
			windowStore,
			weekdays: routineStore.weekdays as string[],
			routines: routineStore.routines as RoutineData[],
			getRoutineData: routineStore.getRoutineData,
			deleteRoutine: routineStore.deleteRoutine,
			addRoutine: routineStore.addRoutine,
			userToken,
			exercises,
			showSnackBar: false,
			token: Cookies.get('token')
		});
	},
	watch: {
		userToken () {
			this.routineStore.getRoutineData();
		}
	},
	methods: {
		updateUserToken () {
			if (this.userToken !== Cookies.get('token')) {
				this.userToken = Cookies.get('token');
			}
		}
	},
	components: {
		RoutineModal,
		WorkoutCard,
		RoutineTab,
		LoginBanner,
		MyFooter
	},
	async created () {
		window.setInterval(this.updateUserToken, 100); // Routinely check if user signs in or out
	}
});
</script>

<style scoped lang="scss">
main {
	display: grid;
	grid-template-rows: auto 1fr;
	grid-template-columns: 1fr;

	.v-container {
		grid-row: 2 / 3;
	}
}
</style>
