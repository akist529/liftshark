<template>
<button class="ModeButton" @click="modeStore.toggleDarkMode">
	<span
		id="light-mode"
		:class="modeStore.darkMode ? 'inactive' : 'active'"
	></span>
	<SliderButton />
	<span
		id="dark-mode"
		:class="modeStore.darkMode ? 'active' : 'inactive'"
	></span>
</button>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useModeStore } from '@/stores/modeStore';
// Local components
import SliderButton from '@/components/buttons/SliderButton.vue';

export default defineComponent({
	data () {
		const modeStore = useModeStore();

		return ({
			modeStore
		});
	},
	components: {
		SliderButton
	}
});
</script>

<style scoped lang="scss">
.ModeButton {
	/* Positioning */
	display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;

	/* Visual */
	background: none;
	border: none;
	cursor: pointer;

	.inactive {
		filter: invert(1) opacity(30%);
	}

	.active {
		filter: invert(1) opacity(100%);
	}

	#light-mode {
		display: inline-block;
		content: '';
		width: 25px;
		height: 25px;
		background-image: url('/public/images/icons/light_mode.svg');
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center;
	}

	#dark-mode {
		display: inline-block;
		content: '';
		width: 25px;
		height: 25px;
		background-image: url('/public/images/icons/dark_mode.svg');
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center;
	}
}

@media only screen and (min-width: 992px) {
	.ModeButton {
		position: absolute;
		top: 10px;
		left: 10px;

		.inactive {
			filter: invert(0) opacity(30%);
		}

		.active {
			filter: invert(0) opacity(100%);
		}
	}
}
</style>
