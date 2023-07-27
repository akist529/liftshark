<template>
<ModalBackground>
<dialog open class="warning-modal">
	<CloseButton
		@click="loginStore.toggleWarningModal" />
	<strong>
		<slot></slot>
	</strong>
	<div class="warning-btns">
		<StrongButton
			@click="loginStore.removeToken"
		>YES</StrongButton>
		<GenericButton
			@click="loginStore.toggleWarningModal"
		>NO</GenericButton>
	</div>
</dialog>
</ModalBackground>
</template>

<script scoped lang="ts">
import { defineComponent } from 'vue';
// Pinia stores
import { useLoginStore } from '@/stores/loginStore';
// Local components
import ModalBackground from '@/components/ModalBackground.vue';
import CloseButton from '@/components/buttons/CloseButton.vue';
import StrongButton from '@/components/buttons/StrongButton.vue';
import GenericButton from '@/components/buttons/GenericButton.vue';

export default defineComponent({
	data () {
		const loginStore = useLoginStore();

		return ({
			loginStore
		});
	},
	components: {
		ModalBackground,
		CloseButton,
		StrongButton,
		GenericButton
	}
});
</script>

<style scoped lang="scss">
.warning-modal {
	/* Positioning */
	display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	position: fixed;
		top: 50%;
		left: 50%;
	transform: translate(-50%, -50%);
	width: 80vw;
	height: 40vh;

	/* Visual */
	background-color: rgb(255, 255, 255);
	padding: 10px;

	.warning-btns {
		display: flex;
			justify-content: space-around;
			align-items: center;
		width: 100%;
	}
}
</style>
