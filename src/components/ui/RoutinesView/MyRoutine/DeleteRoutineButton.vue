<template>
<button class="DeleteRoutineButton"></button>
</template>

<style scoped lang="scss">
.DeleteRoutineButton {
	/* Positioning */
	display: flex;
		justify-content: center;
		align-items: center;
	position: absolute;
		top: 5px;
		right: 5px;

	/* Visual */
	background: none;
	border: none;
	cursor: pointer;
	padding: 5px;

	&::after {
		content: '';
		width: 24px;
		height: 24px;
		background-image: url('/public/images/icons/close.svg');
		background-size: contain;
		background-repeat: no-repeat;
	}

	&:hover {
		filter: invert(16%) sepia(84%) saturate(5402%) hue-rotate(1deg) brightness(98%) contrast(126%);
	}
}
</style>
