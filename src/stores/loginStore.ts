import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import axios from 'axios';

export const useLoginStore = defineStore('useLoginStore', {
    state: () => ({
        modalOpen: false,
        warningOpen: false,
        error: false,
        loggingIn: true
    }),
    actions: {
        toggleLoginModal () {
            this.modalOpen = !this.modalOpen;
        },
        toggleWarningModal () {
            this.warningOpen = !this.warningOpen;
        },
        setLoggingIn () {
            this.loggingIn = true;
        },
        setRegistering () {
            this.loggingIn = false;
        },
        removeToken () {
            Cookies.remove('token');
            this.toggleWarningModal();
        },
        async registerUser (username: string, email: string, password: string) {
			await axios.post('http://localhost:1337/api/auth/local/register', {
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
			await axios.post('http://localhost:1337/api/auth/local', {
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
				this.toggleLoginModal();
			}).catch(error => {
				this.error = true;
				console.log(error.response);
			});
		}
    }
});
