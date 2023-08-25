import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import WorkoutsView from '@/views/WorkoutsView.vue';
import RoutinesView from '@/views/RoutinesView.vue';
import StatsView from '@/views/StatsView.vue';
import ExercisesView from '@/views/ExercisesView.vue';
import ExerciseView from '@/views/ExerciseView.vue';
import PageErrorView from '@/views/PageErrorView.vue';
import CreditsView from '@/views/CreditsView.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Dashboard - Lift Shark',
		component: DashboardView
	},
	{
		path: '/workouts',
		name: 'Workouts - Lift Shark',
		component: WorkoutsView
	},
	{
		path: '/routines',
		name: 'Routines - Lift Shark',
		component: RoutinesView
	},
	{
		path: '/stats',
		name: 'Stats - Lift Shark',
		component: StatsView
	},
	{
		path: '/exercises',
		name: 'Exercise List - Lift Shark',
		component: ExercisesView
	},
	{
		path: '/exercise/:id',
		name: 'Exercise - Lift Shark',
		component: ExerciseView,
		props: true
	},
	{
		path: '/credits',
		name: 'Credits - Lift Shark',
		component: CreditsView
	},
	{
		path: '/:catchAll(.*)*',
		name: '404 - Page Not Found - Lift Shark',
		component: PageErrorView
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach((to, from, next) => {
	document.title = to.name as string;
	next();
});

export default router;
