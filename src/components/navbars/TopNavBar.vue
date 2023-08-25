<template>
<v-app-bar
	color="blue-grey-darken-4"
	density="compact"
>
	<v-app-bar-nav-icon
        width="auto"
        height="auto"
        variant="plain"
    >
		<ModeButton v-if="windowStore.width <= 470" />
        <ModeSlider v-else />
    </v-app-bar-nav-icon>
	<v-spacer></v-spacer>
    <v-app-bar-title
        class="text-h4 text-uppercase"
    >
        <span>Lift</span>
        <span
            class="shark-icon"
        ></span>
        <span>Shark</span>
    </v-app-bar-title>
	<v-spacer></v-spacer>
	<WarningModal v-if="loginStore.token" />
	<LoginModal v-else />
</v-app-bar>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useLoginStore } from '@/stores/loginStore';
import { useWindowStore } from '@/stores/windowStore';
// Local components
import ModeButton from '../buttons/ModeButton/ModeButton.vue';
import ModeSlider from '../buttons/ModeButton/ModeSlider.vue';
import LoginModal from '../modals/LoginModal.vue';
import WarningModal from '../modals/WarningModal.vue';

export default defineComponent({
	data () {
		return ({
			loginStore: useLoginStore(),
			windowStore: useWindowStore()
		});
	},
	components: {
		ModeButton,
		ModeSlider,
		LoginModal,
		WarningModal
	}
});
</script>

<style scoped lang="scss">
.TopNavBar {
	/* Positioning */
	display: flex;
		justify-content: space-between;
		align-items: center;
	position: relative;
		z-index: 0;
	grid-row: 1 / 2;
	grid-column: 1 / -1;
	width: 100%;

	/* Visual */
	padding: 10px 5px;
	background: rgb(20, 20, 20);
}

.v-toolbar-title {
    min-width: auto;
    margin-left: 8px;
    margin-right: 8px;
}

.shark-icon {
    background-image: url('/public/shark.webp');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 32px;
    height: 32px;
    content: '';
    display: inline-flex;
    filter: invert(1);
}
</style>
