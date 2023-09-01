<template>
<v-main
    :class="modeStore.darkMode ? 'bg-grey-darken-4' : 'bg-blue-lighten-4'"
>
    <v-container
        fluid
		class="fill-height pa-0"
    >
        <v-row
            no-gutters
			class="ma-0 align-self-start w-100"
        >
            <v-col :cols="12">
                <DashboardToolbar />
                <LoginBanner
                    v-if="!loginStore.token"
                />
            </v-col>
        </v-row>
        <v-row
            v-if="workoutStore.activeWorkouts.length"
			class="content w-100 ma-0 align-self-stretch"
        >
            <v-col :cols="12">
                <v-card
                    class="mx-auto bg-grey-darken-4"
                    elevation="8"
                    max-width="800"
                    :height="400"
                >
                    <v-card-title
                        class="flex text-center"
                    >
                        Today's Workouts
                        <v-icon
                            icon="mdi-weight-lifter"
                            size="large"
                        ></v-icon>
                    </v-card-title>
                    <v-card-text
                        class="mx-auto bg-grey-darken-4 d-flex justify-center align-start"
                        elevation="8"
                        max-width="800"
                        :height="400"
                    >
                        <v-window
                            v-model="window"
                            show-arrows
                            :height="400"
                            class="d-flex justify-center align-start"
                        >
                            <v-window-item
                                v-for="workout in workoutStore.activeWorkouts"
                                :key="workout.id"
                                class="mx-auto"
                                :height="400"
                            >
                                <WorkoutCard
                                    class="overflow-y-auto"
                                    :workout="workout"
                                    :preview="true"
                                    :height="325"
                                />
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row
            v-if="routineStore.activeDayRoutines.length"
            no-gutters
			class="content w-100 ma-0 align-self-stretch"
        >
            <v-col :cols="12">
                <v-list>
                    <v-list-subheader>Today's Routines</v-list-subheader>
                    <v-list-item
                        v-for="routine in routineStore.activeDayRoutines"
                        :key="routine.id"
                    >
                        <RoutinePreview
                            :routine="routine"
                        />
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
        <v-row
            v-if="!workoutStore.activeWorkouts.length && !routineStore.activeDayRoutines.length"
            no-gutters
			class="content w-100 ma-0 align-self-stretch"
        >
            <v-col :cols="12">
                <v-container class="h-100">
                    <v-row class="h-100">
                        <v-col
                            :cols="12"
                            class="d-flex justify-center align-center"
                        >
                            <InfoAlert
                                title="No Workouts or Routines"
                                text="No workouts logged today or routines scheduled for today."
                            />
                        </v-col>
                    </v-row>
                </v-container>
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
// Type interfaces
import { ExerciseData } from '@/types/index';
// Pinia stores
import { useRoutineStore } from '@/stores/routineStore';
import { useWorkoutStore } from '@/stores/workoutStore';
import { useWindowStore } from '@/stores/windowStore';
import { useLoginStore } from '@/stores/loginStore';
import { useModeStore } from '@/stores/modeStore';
// Local components
import RoutinePreview from '@/components/ui/DashboardView/RoutinePreview.vue';
import WorkoutCard from '@/components/cards/WorkoutCard.vue';
import LoginBanner from '@/components/banners/LoginBanner.vue';
import DashboardToolbar from '@/components/toolbars/DashboardToolbar.vue';
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
            workoutStore: useWorkoutStore(),
            windowStore: useWindowStore(),
            loginStore: useLoginStore(),
            modeStore: useModeStore(),
            exercises,
            window: 0
        });
    },
    computed: {
        cols () {
			if (this.windowStore.width < 800) {
				return 12;
			} else if (this.windowStore.width < 992) {
				return 6;
			} else {
				return 4;
			}
		}
    },
    components: {
        RoutinePreview,
        WorkoutCard,
        LoginBanner,
        DashboardToolbar,
        MyFooter,
        InfoAlert
    }
});
</script>

<style scoped>
.content {
	background-image: url('/public/images/ui/shark-bg.webp');
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: scroll;
}

@media only screen and (min-width: 600px) {
	.content {
		background-size: contain;
	}
}
</style>
