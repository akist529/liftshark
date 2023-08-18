<template>
<v-main
    ref="view"
>
    <DashboardToolbar />
    <LoginBanner
        v-if="!token"
    />
    <v-card
        v-if="workoutStore.activeWorkouts.length"
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
    <v-container>
        <v-row v-if="routineStore.activeDayRoutines.length">
            <v-col>
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
        <v-row v-else>
            <v-col>
                <h2>Nothing logged for today.</h2>
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
// Local components
import RoutinePreview from '@/components/ui/DashboardView/RoutinePreview.vue';
import WorkoutCard from '@/components/cards/WorkoutCard.vue';
import LoginBanner from '@/components/banners/LoginBanner.vue';
import DashboardToolbar from '@/components/toolbars/DashboardToolbar.vue';
// Third-party libraries
import Cookies from 'js-cookie';

const getData = async (): Promise<ExerciseData> => {
	return await fetch('https://wger.de/api/v2/exercise?limit=999&language=2')
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
    data () {
        const routineStore = useRoutineStore();
        const workoutStore = useWorkoutStore();
        const windowStore = useWindowStore();
        const exercises = useQuery('exercises', () => getData());

        return ({
            routineStore,
            workoutStore,
            windowStore,
            exercises,
            token: Cookies.get('token'),
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
        DashboardToolbar
    }
});
</script>
