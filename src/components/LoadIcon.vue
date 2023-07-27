<template>
<div class="LoadIcon">
	<img v-if="firstFrameShown"
		alt="Loading..."
		:src="assetspath('./ui/loading-0.webp')" />
	<img v-if="!firstFrameShown"
		alt="Loading..."
		:src="assetspath('./ui/loading-1.webp')" />
	<span>Loading...</span>
</div>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Mixins
import { fetchImages } from '@/mixins/fetchImages';

export default defineComponent({
	data () {
		const firstFrameShown = true;

		return ({
			firstFrameShown
		});
	},
	mixins: [fetchImages],
	methods: {
		changeIcons () {
			this.firstFrameShown = !this.firstFrameShown;
		}
	},
	mounted () {
		setInterval(this.changeIcons, 500);
	}
});
</script>

<style scoped lang="scss">
.LoadIcon {
	display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;

	img {
		width: 96px;
	}
}
</style>
