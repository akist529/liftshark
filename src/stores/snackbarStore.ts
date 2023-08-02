// Pinia imports
import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('snackbarStore', {
    state: () => ({
        open: false,
        text: 'Snackbar',
        color: 'success',
        icon: 'mdi-check-circle'
    }),
    actions: {
        toggleSnackbar () {
            this.open = !this.open;
        }
    }
});
