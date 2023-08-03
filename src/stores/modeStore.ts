// Pinia imports
import { defineStore } from 'pinia';

export const useModeStore = defineStore('useModeStore', {
    state: () => ({
        darkMode: false
    }),
    actions: {
        toggleDarkMode () {
            this.darkMode = !this.darkMode;
        }
    }
});
