<template>
<nav>
	<ModeButton />
	<LogButton
		:userToken = userToken
		@click="handleLogButton"
	/>
</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cookies from 'js-cookie';
import { fetchImages } from '@/mixins/fetchImages';
// Local components
import ModeButton from '@/components/buttons/ModeButton.vue';
import LogButton from '@/components/buttons/LogButton.vue';

export default defineComponent({
	components: {
		ModeButton,
		LogButton
	},
	mixins: [fetchImages],
	methods: {
		handleLogButton () {
			if (Cookies.get('token')) {
				this.$emit('handleWarningModal');
			} else this.$emit('handleLoginModal');
		}
	},
	props: {
		userToken: String
	}
});
</script>

<style scoped lang="scss">
nav {
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

	img {
		filter: invert(1);
	}
}
</style>
