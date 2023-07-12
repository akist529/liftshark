import { defineComponent } from 'vue';
import Cookies from 'js-cookie';
import { Workout } from '@/types/index';

export const fetchWorkouts = defineComponent({
    data () {
        const workouts: Workout[] = [];
        const error = false;

        return ({
            workouts,
            error
        });
    },
    methods: {
        async fetchWorkouts (year: number, month: number, date: number) {
			if (Cookies.get('token')) {
				await fetch('http://localhost:1337/api/workouts', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					}
				}).then(response => {
					return response.json();
				}).then(data => {
					const workouts: Workout[] = [];

					for (const workout of data.data) {
						if (workout.attributes.date === new Date(year, month, date, 0).toISOString().split('T')[0]) {
							workouts.push(workout);
						}
					}

					this.workouts = workouts;
				}).catch(error => {
					console.log(error);
                    this.error = true;
				});
			} else {
				this.workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
			}
		}
    }
});
