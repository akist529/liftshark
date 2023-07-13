import { defineStore } from 'pinia';

export const exerciseStore = defineStore('exerciseStore', {
    state: () => ({
        favorited: <number[]>[]
    }),
    getters: {
        favorited: (state) => {
            return state.favorited;
        }
    }
});
