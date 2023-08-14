<template>
<main class="DashboardView" ref="view">
    <v-toolbar
		color="primary"
	>
        <v-toolbar-title
			class="flex text-center"
		>
			<v-icon
                v-if="isMorning"
				icon="mdi-weather-sunny"
                size="xxx-large"
                class="mr-3"
			></v-icon>
            <v-icon
                v-else-if="isNoon"
                icon="mdi-weather-cloudy"
                size="xxx-large"
                class="mr-3"
            ></v-icon>
            <v-icon
                v-else
                icon="mdi-weather-night"
                size="xxx-large"
                class="mr-3"
            ></v-icon>
			<span v-if="isMorning">Good morning, Alex!</span>
            <span v-else-if="isNoon">Good afternoon, Alex!</span>
            <span v-else>Good evening, Alex!</span>
		</v-toolbar-title>
	</v-toolbar>
    <LoginBanner v-if="!token" />
    <div v-if="workoutStore.activeWorkouts.length">
        <h2 v-if="workoutStore.activeWorkouts.length > 1">Today's Workouts</h2>
        <h2 v-else>Today's Workout</h2>
        <WorkoutLog v-for="workout in workoutStore.activeWorkouts"
			:key="workout.id"
            :workout="workout"
            :preview="true" />
    </div>
    <div v-else-if="routineStore.activeDayRoutines.length">
        <h2 v-if="routineStore.activeDayRoutines.length > 1">Today's Routines</h2>
        <h2 v-else>Today's Routine</h2>
        <RoutinePreview v-for="routine in routineStore.activeDayRoutines"
            :key="routine.id"
            :routine="routine" />
    </div>
    <div v-else>
        <h2>Nothing logged for today.</h2>
    </div>
    <MyFooter />
</main>
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
import WorkoutLog from '@/components/ui/WorkoutsView/WorkoutLog.vue';
import LoginBanner from '@/components/banners/LoginBanner.vue';
import MyFooter from '@/components/MyFooter.vue';
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
            token: Cookies.get('token')
        });
    },
    computed: {
        isMorning () {
            const hour = new Date().getHours();
            return hour >= 5 && hour < 12;
        },
        isNoon () {
            const hour = new Date().getHours();
            return hour >= 12 && hour < 17;
        },
        icon () {
            if (this.isMorning) {
                return '/images/icons/sunrise.webp';
            } else if (this.isNoon) {
                return '/images/icons/afternoon.webp';
            } else {
                return '/images/icons/half-moon.webp';
            }
        }
    },
    components: {
        RoutinePreview,
        WorkoutLog,
        LoginBanner,
        MyFooter
    }
});
</script>

<style scoped lang="scss">
.DashboardView {
    gap: 20px;
    text-align: center;

    .icon {
        display: inline-block;
            justify-content: center;
            align-items: center;
        content: '';
        width: 48px;
        height: 48px;
        background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
    }

    h2 {
        display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;

        &::after {
            display: inline-block;
            content: '';
            width: 32px;
            height: 32px;
            background-image: url('/public/images/icons/diary.webp');
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
        }
    }
}
</style>
