<template>
<nav class="TopNavBar">
	<ModeButton />
	<LogButton @click="handleLogButton" />
</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cookies from 'js-cookie';
// Pinia stores
import { useLoginStore } from '@/stores/loginStore';
// Local components
import ModeButton from '@/components/buttons/ModeButton.vue';
import LogButton from '@/components/buttons/LogButton.vue';

export default defineComponent({
	data () {
		const loginStore = useLoginStore();

		return ({
			loginStore
		});
	},
	components: {
		ModeButton,
		LogButton
	},
	methods: {
		handleLogButton () {
			if (Cookies.get('token')) {
				this.loginStore.toggleWarningModal();
			} else {
				this.loginStore.toggleLoginModal();
			}
		}
	},
	props: {
		userToken: String
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
