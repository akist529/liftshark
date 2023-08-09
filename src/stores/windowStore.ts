// Pinia imports
import { defineStore } from 'pinia';

export const useWindowStore = defineStore('windowStore', {
    state: () => ({
        width: window.innerWidth,
        height: window.innerHeight
    }),
    getters: {
        isMobile (state) {
            return state.width < 600;
        },
        isTablet (state) {
            return state.width >= 600 && state.width < 992;
        },
        isDesktop (state) {
            return state.width >= 992;
        }
    },
    actions: {
        resize () {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        }
    }
});
