<template>
<v-container
	fluid
	class="fill-height pa-0"
>
	<v-row
		no-gutters
		class="ma-0 align-self-start w-100"
	>
		<v-col
			:cols="12"
			class="d-flex justify-center align-center"
		>
			<v-img
				v-if="firstFrameShown"
				alt="Loading..."
				:width="96"
				:height="96"
				:style="modeStore.darkMode ? {filter: 'invert(1)'} : {}"
				:src="require('/public/images/ui/loading-0.webp')"
			></v-img>
			<v-img
				v-else
				alt="Loading..."
				:width="96"
				:height="96"
				:style="modeStore.darkMode ? {filter: 'invert(1)'} : {}"
				:src="require('/public/images/ui/loading-1.webp')"
			></v-img>
		</v-col>
	</v-row>
	<v-row>
		<v-col :cols="12">
			<span>Loading...</span>
		</v-col>
	</v-row>
</v-container>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useModeStore } from '@/stores/modeStore';

export default defineComponent({
	data () {
		return ({
			firstFrameShown: true,
			modeStore: useModeStore()
		});
	},
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
