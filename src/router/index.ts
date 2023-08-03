import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import WorkoutsView from '@/views/WorkoutsView.vue';
import RoutinesView from '@/views/RoutinesView.vue';
import StatsView from '@/views/StatsView.vue';
import ExercisesView from '@/views/ExercisesView.vue';
import ExerciseView from '@/views/ExerciseView.vue';
import PageErrorView from '@/views/PageErrorView.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Dashboard - Gym Tracker',
		component: DashboardView
	},
	{
		path: '/workouts',
		name: 'Workouts - Gym Tracker',
		component: WorkoutsView
	},
	{
		path: '/routines',
		name: 'Routines - Gym Tracker',
		component: RoutinesView
	},
	{
		path: '/stats',
		name: 'Stats - Gym Tracker',
		component: StatsView
	},
	{
		path: '/exercises',
		name: 'Exercise List - Gym Tracker',
		component: ExercisesView
	},
	{
		path: '/exercise/:id',
		name: 'Exercise - Gym Tracker',
		component: ExerciseView,
		props: true
	},
	{
		path: '/:catchAll(.*)*',
		name: '404 - Page Not Found - Gym Tracker',
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
