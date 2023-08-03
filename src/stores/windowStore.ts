// Pinia imports
import { defineStore } from 'pinia';

export const useWindowStore = defineStore('windowStore', {
    state: () => ({
        width: window.innerWidth,
        height: window.innerHeight
    }),
    actions: {
        resize () {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        }
    }
});
