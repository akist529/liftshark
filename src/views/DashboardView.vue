<template>
<main class="DashboardView" ref="view">
    <ModeButton v-if="windowStore.width >= 992" />
    <header>
        <h1 v-if="isMorning">Good morning, Alex!</h1>
        <h1 v-else-if="isNoon">Good afternoon, Alex!</h1>
        <h1 v-else>Good evening, Alex!</h1>
        <span
            class="icon"
            :style="{backgroundImage: `url(${icon})`}"
        ></span>
    </header>
    <div v-if="workoutStore.activeWorkouts.length">
        <h2 v-if="workoutStore.activeWorkouts.length > 1">Today's Workouts</h2>
        <h2 v-else>Today's Workout</h2>
        <WorkoutPreview v-for="workout in workoutStore.activeWorkouts"
            :key="workout.id"
            :workout="workout" />
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
    <footer>
        <ul>
            <li>Sunrise & evening icons by Freepik</li>
            <li>Afternoon icon by muh zakaria</li>
        </ul>
    </footer>
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
import WorkoutPreview from '@/components/ui/DashboardView/WorkoutPreview.vue';
import ModeButton from '@/components/buttons/ModeButton.vue';

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
            exercises
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
        WorkoutPreview,
        ModeButton
    }
});
</script>

<style scoped lang="scss">
.DashboardView {
    gap: 20px;
    text-align: center;

    header {
        display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;

        .icon {
            display: inline-flex;
                justify-content: center;
                align-items: center;
            content: '';
            width: 64px;
            height: 64px;
            background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
        }
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
