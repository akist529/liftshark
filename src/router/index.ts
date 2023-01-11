import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import WorkoutView from '@/views/WorkoutView.vue'
import WorkoutDetailView from '@/views/WorkoutDetailView.vue'
import RoutineView from '@/views/RoutineView.vue'
import RoutineDetailView from '@/views/RoutineDetailView.vue'
import StatsView from '@/views/StatsView.vue'
import WeightView from '@/views/WeightView.vue'
import MeasureView from '@/views/MeasureView.vue'
import ExerciseView from '@/views/ExerciseView.vue'
import ExerciseDetailView from '@/views/ExerciseDetailView.vue'
import PageErrorView from '@/views/PageErrorView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/workouts',
    name: 'Workouts',
    component: WorkoutView
  },
  {
    path: '/workouts/:date',
    name: 'WorkoutDetail',
    component: WorkoutDetailView
  },
  {
    path: '/routines',
    name: 'Routines',
    component: RoutineView
  },
  {
    path: '/routines/:id',
    name: 'RoutineDetail',
    component: RoutineDetailView
  },
  {
    path: '/stats',
    name: 'Stats',
    component: StatsView
  },
  {
    path: '/stats/weight',
    name: 'Weight',
    component: WeightView
  },
  {
    path: '/stats/measurements',
    name: 'Measurements',
    component: MeasureView
  },
  {
    path: '/exercises/',
    name: 'Exercises',
    component: ExerciseView
  },
  {
    path: '/exercises/:id',
    name: 'ExerciseDetail',
    component: ExerciseDetailView
  },
  {
    path: '/:catchAll(.*)*',
    name: 'PageError',
    component: PageErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
