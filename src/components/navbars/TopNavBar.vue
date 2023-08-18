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
        <ModeButton />
    </v-app-bar-nav-icon>
    <v-app-bar-title
		v-if="windowStore.width >= 450"
        class="flex text-center"
    >
        <v-icon
            icon="mdi-dumbbell"
        ></v-icon>
        Gym Tracker
    </v-app-bar-title>
	<v-spacer v-if="windowStore.width < 450"></v-spacer>
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
import ModeButton from '../buttons/ModeButton.vue';
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
</style>
