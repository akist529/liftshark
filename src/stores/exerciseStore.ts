// Pinia imports
import { defineStore } from 'pinia';
// Third-party libraries
import Cookies from 'js-cookie';
// Type interfaces
import { FavoriteData, Muscle, Equipment } from '@/types/index';

const token: string = Cookies.get('token');

export const useExerciseStore = defineStore('exerciseStore', {
    state: () => ({
        favorites: [] as FavoriteData[],
        loading: false,
        page: 1,
        filteredMuscle: <Muscle | null>null,
        filteredEquipment: <Equipment | null>null
    }),
    actions: {
        async addToFavorites (id: number) {
            this.loading = true;

            if (token) {
                await fetch('http://localhost:1337/api/favorites', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: {
                            exercise_base: id
                        }
                    })
                });
            } else {
                const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

                favorites.push({
                    id: favorites.length,
                    attributes: {
                        exercise_base: id
                    }
                });

                localStorage.setItem('favorites', JSON.stringify(favorites));
            }

            this.getFavorites();
        },
        async removeFromFavorites (id: number) {
            this.loading = true;

            const entry = this.favorites.find(entry => entry.attributes.exercise_base === id);
            if (!entry) return;

            if (token) {
                await fetch(`http://localhost:1337/api/favorites/${entry.id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                const favorites = this.favorites.filter(entry => entry.attributes.exercise_base !== id);
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }

            this.getFavorites();
        },
        async getFavorites () {
            this.loading = true;

            if (token) {
				await fetch('http://localhost:1337/api/favorites', {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
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
                const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                this.favorites = favorites;
            }

            this.loading = false;
        }
    }
});
