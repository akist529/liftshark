import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

const token: string = Cookies.get('token');

export const useExerciseStore = defineStore('exerciseStore', {
    state: () => ({
        favorited: <number[]>[],
        url: 'https://wger.de/api/v2/exercise/?language=2',
        count: 0,
        loading: false
    }),
    actions: {
        async addToFavorites (exerciseId: number) {
            const exerciseInStore = this.favorited.find((id: number) => id === exerciseId);
            if (!exerciseInStore) this.favorited.push(exerciseId);

            const favorites = this.favorited;

            if (token) {
                await fetch('http://localhost:1337/apis/routines', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: {
                            favorites
                        }
                    })
                });
            } else {
                localStorage.setItem('favorited', JSON.stringify(favorites));
            }
        },
        async removeFromFavorites (exerciseId: number) {
            const index = this.favorited.indexOf(exerciseId);
            if (index) this.favorited.splice(index, 1);

            const favorites = this.favorited;

            if (token) {
                await fetch('http://localhost:1337/apis/routines', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: {
                            favorites
                        }
                    })
                });
            } else {
                localStorage.setItem('favorited', JSON.stringify(favorites));
            }
        },
        async getFavorited () {
            this.loading = true;

            if (token) {
				await fetch('http://localhost:1337/api/favorited', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					}
					}).then(response => {
						return response.json();
					}).then(data => {
						this.favorited = data.data;
					}).catch(error => {
						console.log(error);
					});
            } else {
                const localFavorited: number[] = JSON.parse(localStorage.getItem('favorited') || '[]');
                this.favorited = localFavorited;
            }

            this.loading = false;
        },
        updateUrl (url: string) {
            this.url = url;
        },
        updateCount (count: number) {
            this.count = count;
        }
    }
});
