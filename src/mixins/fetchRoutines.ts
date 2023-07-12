import { defineComponent } from 'vue';
import Cookies from 'js-cookie';
import { Routine } from '@/types/index';

export const fetchRoutines = defineComponent({
	data () {
		const routines: Routine[] = [];
		const error = false;

		return ({
			routines,
			error
		});
	},
    methods: {
        async fetchRoutines () {
			if (Cookies.get('token')) {
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
						this.error = true;
					});
			} else return JSON.parse(localStorage.getItem('routines') || '[]');
        }
    }
});
