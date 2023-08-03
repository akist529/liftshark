<template>
<v-switch
	inset
	color="info"
	@click="modeStore.toggleDarkMode"
	class="d-flex justify-start align-center">
	<template v-slot:prepend>
		<v-icon
			icon="mdi-weather-sunny"
			:color="modeStore.darkMode ? 'white' : 'orange'"
		></v-icon>
	</template>
	<template v-slot:append>
		<v-icon
			icon="mdi-moon-waning-crescent"
			:color="modeStore.darkMode ? 'info' : 'white'"
		></v-icon>
	</template>
</v-switch>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useModeStore } from '@/stores/modeStore';

export default defineComponent({
	data () {
		return ({
			modeStore: useModeStore()
		});
	}
});
</script>

<style scoped lang="scss">
@media only screen and (min-width: 992px) {
	.ModeButton {
		position: absolute;
		top: 10px;
		left: 10px;
	}
}
</style>
