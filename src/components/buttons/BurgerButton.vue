<template>
<v-btn
	class="BurgerButton rounded-l"
	width="96"
	height="auto"
	@click="$emit('setMenuOpen')">
	<v-icon
		:icon="menuOpen ? 'mdi-menu-open' : 'mdi-menu'"
		size="xxx-large"
		color="white"
	></v-icon>
</v-btn>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		menuOpen: {
			type: Object as PropType<boolean>,
			required: true
		}
	}
});
</script>

<style scoped lang="scss">
.BurgerButton {
	/* Positioning */
	padding: 15px 10px;
	background-color: rgb(20, 20, 20);
}
</style>
