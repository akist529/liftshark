<template>
<button
	:class="menuOpen ? 'BurgerButton menuClosed' : 'BurgerButton menuOpen'"
	@click="$emit('setMenuOpen')"
></button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchImages } from '@/mixins/fetchImages';

export default defineComponent({
  mixins: [fetchImages],
  props: ['menuOpen']
});
</script>

<style scoped lang="scss">
.BurgerButton {
	/* Positioning */
	display: flex;
		justify-content: center;
		align-items: center;
	width: 35vw;
		max-width: 200px;
	padding: 15px 10px;
	background-color: rgb(20, 20, 20);
	cursor: pointer;
	border: none;
		border-radius: 10px;

	&::after {
		background-size: contain;
            background-repeat: no-repeat;
        width: 64px;
        height: 44px;
        content: '';
		filter: invert(1);
	}
}

.menuOpen {
	&::after {
		background-image: url('/public/images/icons/menu.svg');
	}
}

.menuClosed {
	&::after {
		background-image: url('/public/images/icons/menu_open.svg');
	}
}
</style>
