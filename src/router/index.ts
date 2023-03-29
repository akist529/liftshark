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
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/workouts',
    name: 'workouts',
    component: WorkoutView
  },
  {
    path: '/workouts/:date',
    name: 'workoutDetail',
    component: WorkoutDetailView
  },
  {
    path: '/routines',
    name: 'routines',
    component: RoutineView
  },
  {
    path: '/routines/:id',
    name: 'routineDetail',
    component: RoutineDetailView
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatsView
  },
  {
    path: '/stats/weight',
    name: 'weight',
    component: WeightView
  },
  {
    path: '/stats/measurements',
    name: 'measurements',
    component: MeasureView
  },
  {
    path: '/exercises',
    name: 'exercises',
    component: ExerciseView
  },
  {
    path: '/exercises/:id',
    name: 'exerciseDetail',
    component: ExerciseDetailView,
    props: true
  },
  {
    path: '/:catchAll(.*)*',
    name: 'pageError',
    component: PageErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.name as string
  next()
})

export default router
