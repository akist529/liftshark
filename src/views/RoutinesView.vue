<template>
<div class="RoutinesView">
	<h1>My Routines</h1>
	<SelectDay @change="updateActiveDay" />
	<MyRoutine v-for="routine in filterRoutines()"
		:routine="routine"
		:exercises="exercises"
		:key="routine.id"
		@getUserRoutines="getUserRoutines()"
		@deleteRoutine="deleteRoutine(id)" />
	<AddButton itemAdded="routine" @clicked="newRoutine()">
		<span>New Routine</span>
	</AddButton>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';
import { fetchImages } from '@/mixins/fetchImages';
import { Exercise, Routine } from '@/types/index';
// Local components
import AddButton from '@/components/buttons/AddButton.vue';
import MyRoutine from '@/components/ui/RoutinesView/MyRoutine.vue';
import SelectDay from '@/components/ui/RoutinesView/SelectDay.vue';

export default defineComponent({
	data () {
		const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const activeDay = localStorage.getItem('activeDay') || 'Sunday';
		const routines: Routine[] = [];
		const exercises: Exercise[] = [];
		const userToken = Cookies.get('token');

		return ({
			weekdays,
			activeDay,
			routines,
			exercises,
			userToken
		});
	},
	provide () {
		return ({
			weekdays: this.weekdays,
			activeDay: this.activeDay
		});
	},
	watch: {
		userToken () {
			this.getUserRoutines();
		}
	},
	methods: {
		updateActiveDay () {
			localStorage.setItem('activeDay', (this.$refs.day as HTMLSelectElement).value);
			this.activeDay = localStorage.getItem('activeDay') || 'Sunday';
		},
		async newRoutine () {
			if (Cookies.get('token')) {
				await fetch('http://localhost:1337/api/routines', {
					method: 'POST',
					headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
					'Content-Type': 'application/json'
					},
					body: JSON.stringify({
					data: {
						name: 'New Routine',
						day: this.activeDay,
						exercises: []
					}
					})
				}).then(response => {
					console.log(response);
				}).catch(error => {
					console.log(error);
				});

				this.getUserRoutines();
			} else {
				const localRoutines: Routine[] = JSON.parse(localStorage.getItem('routines') || '[]');

				localRoutines.push({
					id: JSON.parse(localStorage.getItem('routines') || '[]').length,
					attributes: {
						name: 'New Routine',
						day: this.activeDay,
						exercises: []
					}
				});

				localStorage.setItem('routines', JSON.stringify(localRoutines));
				this.getUserRoutines();
			}
		},
		async getUserRoutines () {
			if (Cookies.get('token')) { // If user logged in
				await fetch('http://localhost:1337/api/routines', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					}
				}).then(response => {
					return response.json();
				}).then(data => {
					this.routines = data.data;
				}).catch(error => {
					console.log(error);
				});
			} else { // If signed out
				this.routines = JSON.parse(localStorage.getItem('routines') || '[]');
			}
		},
		updateUserToken () {
			if (this.userToken !== Cookies.get('token')) {
				this.userToken = Cookies.get('token');
			}
		},
		filterRoutines () {
			return this.routines.filter(routine => {
				return routine.attributes.day === this.activeDay;
			})
		},
		async getRoutine (id) {
			return await fetch('http://localhost:1337/api/routines' + `/${id && id}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
					'Content-Type': 'application/json'
				}
				}).then(response => {
				return response.json()
				}).then(data => {
				return data
				}).catch(error => {
				console.log(error)
				});
		},
		async deleteRoutine (id: number) {
			console.log('test');

			const updatedRoutines = this.routines.filter(routine => {
				return routine.id !== id;
			});

			if (Cookies.get('token')) {
				await fetch('http://localhost:1337/apis/routines', {
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
					data: {
						updatedRoutines
					}
					})
				});
			} else {
				console.log('test');
				localStorage.setItem('routines', JSON.stringify(updatedRoutines));
			}
		}
	},
	components: {
		AddButton,
		MyRoutine,
		SelectDay
	},
	mixins: [fetchImages],
	async created () {
		await this.getUserRoutines();

		await axios.get('https://wger.de/api/v2/exercise?limit=999&language=2')
			.then(response => {
				this.exercises = response.data.results
			}).catch(error => {
				console.log(error)
			});

		window.setInterval(this.updateUserToken, 100); // Routinely check if user signs in or out
	}
});
</script>

<style scoped lang="scss">
.RoutinesView {
	display: flex;
		flex-direction: column;
		gap: 30px;

	#day {
		font-size: 18px;
		appearance: none;
	}
}

.ArrowDown {
	background-repeat: no-repeat, repeat;
		background-position: right 10px top 50%, 0 0;
		background-size: .65em auto, 100%;
	padding: 0 5px;
	width: 150px;
}
</style>
