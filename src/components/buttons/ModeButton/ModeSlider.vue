<template>
<v-switch
	inset
	color="info"
	@click="modeStore.toggleDarkMode"
	class="d-inline-flex justify-center align-center">
	<template v-slot:prepend>
		<v-icon
			icon="mdi-weather-sunny"
			:color="modeStore.darkMode ? 'white' : 'red'"
			:style="{marginRight: '-8px'}"
		></v-icon>
	</template>
	<template v-slot:append>
		<v-icon
			icon="mdi-moon-waning-crescent"
			:color="modeStore.darkMode ? 'info' : 'black'"
			:style="{marginLeft: '-8px'}"
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
