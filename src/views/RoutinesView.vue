<template>
<v-main class="bg-blue-lighten-4">
	<v-container
		fluid
		class="fill-height pa-0"
	>
		<v-row
			no-gutters
			class="ma-0 align-self-start w-100"
		>
			<v-col :cols="12">
				<RoutineToolbar />
				<LoginBanner
					v-if="!loginStore.token"
				/>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			class="w-100 ma-0 align-self-stretch"
		>
			<v-col :cols="12">
				<v-window
					v-model="routineStore.activeDay"
				>
					<v-window-item
						v-for="(day, index) in routineStore.weekdays"
						:key="index"
						:value="index"
						class="mx-auto pa-2"
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
						<InfoAlert
							v-else
							title="No Routines"
							:text="`You have no routines for ${day}.`"
						/>
					</v-window-item>
				</v-window>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			class="ma-0 align-self-end"
		>
			<v-col :cols="12">
				<MyFooter />
			</v-col>
		</v-row>
	</v-container>
</v-main>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Third-party libraries
import Cookies from 'js-cookie';
// Type interfaces
import { ExerciseData } from '@/types/index';
// Pinia stores
import { useRoutineStore } from '@/stores/routineStore';
import { useWindowStore } from '@/stores/windowStore';
import { useLoginStore } from '@/stores/loginStore';
// Local components
import WorkoutCard from '@/components/cards/WorkoutCard.vue';
import LoginBanner from '@/components/banners/LoginBanner.vue';
import RoutineToolbar from '@/components/toolbars/RoutineToolbar.vue';
import MyFooter from '@/components/MyFooter.vue';
import InfoAlert from '@/components/alerts/InfoAlert.vue';

const getData = async (): Promise<ExerciseData> => {
	return await fetch('https://wger.de/api/v2/exercise?limit=999&language=2')
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
	data () {
		const exercises = useQuery('exercises', () => getData());

		return ({
			routineStore: useRoutineStore(),
			windowStore: useWindowStore(),
			loginStore: useLoginStore(),
			exercises
		});
	},
	watch: {
		userToken () {
			this.routineStore.getRoutineData();
		}
	},
	methods: {
		updateUserToken () {
			if (this.loginStore.token !== Cookies.get('token')) {
				this.loginStore.token = Cookies.get('token');
			}
		}
	},
	components: {
		WorkoutCard,
		LoginBanner,
		RoutineToolbar,
		MyFooter,
		InfoAlert
	},
	async created () {
		window.setInterval(this.updateUserToken, 100); // Routinely check if user signs in or out
	}
});
</script>
