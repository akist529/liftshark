// Pinia imports
import { defineStore } from 'pinia';
// Third-party libraries
import Cookies from 'js-cookie';

const token: string = Cookies.get('token');

export const useExerciseStore = defineStore('exerciseStore', {
    state: () => ({
        favorites: [] as number[],
        url: 'https://wger.de/api/v2/exercise/?language=2',
        count: 0,
        loading: false
    }),
    actions: {
        async addToFavorites (id: number) {
            const exerciseInStore = this.favorites.find((key: number) => key === id);
            if (!exerciseInStore) this.favorites.push(id);

            const favorites = this.favorites;

            if (token) {
                await fetch('http://localhost:1337/apis/favorites', {
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
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }
        },
        async removeFromFavorites (id: number) {
            this.favorites = this.favorites.filter((key: number) => key !== id);
            const favorites = this.favorites;

            if (token) {
                await fetch('http://localhost:1337/apis/favorites', {
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
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }
        },
        async getFavorites () {
            this.loading = true;

            if (token) {
				await fetch('http://localhost:1337/api/favorites', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${Cookies.get('token')}`,
						'Content-Type': 'application/json'
					}
					}).then(response => {
						return response.json();
					}).then(data => {
						this.favorites = data.data;
					}).catch(error => {
						console.log(error);
					});
            } else {
                const localFavorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
                this.favorites = localFavorites;
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
