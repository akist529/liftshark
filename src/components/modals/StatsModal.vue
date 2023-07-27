<template>
<ModalBackground>
<dialog class="StatsModal">
    <CloseButton
		@click="statStore.toggleModal" />
</dialog>
</ModalBackground>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useStatStore } from '@/stores/statStore';
// Local components
import ModalBackground from '../ModalBackground.vue';
import CloseButton from '../buttons/CloseButton.vue';

export default defineComponent({
    data () {
        const statStore = useStatStore();

        return ({
            statStore
        });
    },
    components: {
        ModalBackground,
        CloseButton
    }
})
</script>

<style scoped lang="scss">
.StatsModal {
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
	height: 80vh;

	/* Visual */
	background-color: rgb(255, 255, 255);
	padding: 15px;
	border: none;
	border-radius: 20px;
	filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5));
	font-family: 'Karla';
	text-transform: uppercase;
}
</style>
