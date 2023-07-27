<template>
<div class="SliderButton">
	<div :class="modeStore.darkMode ? 'slider dark' : 'slider light'"></div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// Pinia stores
import { useModeStore } from '@/stores/modeStore';

export default defineComponent({
    data () {
        const modeStore = useModeStore();

        return ({
            modeStore
        });
    }
});
</script>

<style lang="scss">
.SliderButton {
    /* Positioning */
    display: flex;
		align-items: center;
		position: relative;

    /* Visual */
    background-color: rgb(255, 255, 255);
    width: 40px;
    height: 20px;
    border-radius: 10px;
    cursor: pointer;

    .slider {
        /* Positioning */
        position: absolute;

        /* Visual */
        background-color: rgb(0, 0, 0);
        width: 15px;
        height: 15px;
        border-radius: 50%;
        transition: 1s;
    }

    .light {
        animation-name: darkToLight;
			animation-duration: 0.25s;
			animation-fill-mode: forwards;
    }

    .dark {
        animation-name: lightToDark;
			animation-duration: 0.25s;
			animation-fill-mode: forwards;
    }

    @keyframes lightToDark {
        from {
            left: 0px;
        } to {
            left: 25px;
        }
    }

    @keyframes darkToLight {
        from {
            left: 25px;
        } to {
            left: 0px;
        }
    }
}

@media only screen and (min-width: 992px) {
    .SliderButton {
        /* Visual */
        background-color: rgb(0, 0, 0);

        .slider {
            /* Visual */
            background-color: rgb(255, 255, 255);
        }
    }
}
</style>
