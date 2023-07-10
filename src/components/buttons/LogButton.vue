<template>
<button>
	<span v-if="userToken">Log Out</span>
	<span v-if="!userToken">Log In</span>
	<div>
		<img v-if="userToken"
			alt="Log Out"
			:src="assetspath('./ui/sidebar/logout.webp')" />
		<img v-if="!userToken"
			alt="Log In"
			:src="assetspath('./ui/sidebar/login.webp')" />
	</div>
</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchImages } from '@/mixins/fetchImages';
import Cookies from 'js-cookie';

export default defineComponent({
	data () {
		return ({
			Cookies
		});
	},
	mixins: [fetchImages],
	props: {
		userToken: String
	}
});
</script>

<style scoped lang="scss">
button {
	/* Positioning */
	display: grid;
		grid-template-columns: 60px 30px;
		grid-template-rows: 1fr;
		justify-items: center;
		align-items: center;

	/* Visual */
	border: none;
		border-radius: 10px;
	overflow: hidden;

	span {
		font-family: var(--title-font);
	}

	div {
		/* Positioning */
		display: flex;
			justify-content: center;
			align-items: center;

		/* Visual */
		background-color: var(--button-bg-color);

		img {
			filter: invert(1);
			width: 100%;
			height: 100%;
			padding: 5px;
		}
	}
}
</style>
