<template>
<button class="LogButton">
	<span>Log {{ userToken ? 'Out' : 'In' }}</span>
	<div class="icon-bg">
		<span
			class="icon"
			:style="{backgroundImage: `url(/images/icons/${userToken ? 'logout' : 'login'}.svg)`}"
		></span>
	</div>
</button>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		userToken: {
			type: Object as PropType<string>
		}
	}
});
</script>

<style scoped lang="scss">
.LogButton {
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
	cursor: pointer;
	background: white;

	span {
		font-family: var(--title-font);
	}

	.icon-bg {
		background-color: var(--button-bg-color);
		padding: 5px;

		.icon {
			/* Visual */
			filter: invert(1);
			display: inline-block;
			content: '';
			width: 20px;
			height: 20px;
			background-repeat: no-repeat;
				background-size: contain;
				background-position: center;
		}
	}
}
</style>
