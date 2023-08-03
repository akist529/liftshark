<template>
<nav class="TopNavBar">
	<ModeButton />
	<WarningModal v-if="token" />
	<LoginModal v-else />
</nav>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Third-party libraries
import Cookies from 'js-cookie';
// Pinia stores
import { useLoginStore } from '@/stores/loginStore';
// Local components
import ModeButton from '@/components/buttons/ModeButton.vue';
import LoginModal from './modals/LoginModal.vue';
import WarningModal from './modals/WarningModal.vue';

export default defineComponent({
	data () {
		const loginStore = useLoginStore();
		const token = Cookies.get('token');

		return ({
			loginStore,
			token
		});
	},
	components: {
		ModeButton,
		LoginModal,
		WarningModal
	},
	methods: {
		handleLogButton () {
			if (Cookies.get('token')) {
				this.loginStore.toggleWarningModal();
			} else {
				this.loginStore.toggleLoginModal();
			}
		}
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
