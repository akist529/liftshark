// Pinia imports
import { defineStore } from 'pinia';
// Pinia stores
import { useSnackbarStore } from './snackbarStore';
// Third-party libraries
import Cookies from 'js-cookie';
import axios from 'axios';

export const useLoginStore = defineStore('loginStore', {
    state: () => ({
        error: false,
		snackbarStore: useSnackbarStore(),
		token: (Cookies.get('stayLoggedIn') === 'true') ? (Cookies.get('token') || null) : null
    }),
    actions: {
        removeToken () {
            Cookies.remove('token');
        },
        async registerUser (username: string, email: string, password: string) {
			await axios.post('https://strapi-hj5r.onrender.com/api/auth/local/register', {
					username: username,
					email: email,
					password: password
				}).then(response => {
					console.log(response);
					this.error = false;
					this.loginUser(email, password);
				}).catch(error => {
					this.error = true;
					console.log(error.response);
			});
		},
        async loginUser (email: string, password: string) {
			await axios.post('https://strapi-hj5r.onrender.com/api/auth/local', {
				identifier: email,
				password: password
			}, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
			}).then(response => {
				console.log(response);
				this.error = false;
				Cookies.set('token', response.data.jwt);
				this.token = response.data.jwt;
			}).catch(error => {
				this.error = true;
				console.log(error.response);
			});
		}
    }
});
