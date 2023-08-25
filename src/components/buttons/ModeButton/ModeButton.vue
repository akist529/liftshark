<template>
<v-btn
    variant="plain"
    @click="modeStore.toggleDarkMode"
    :style="{minWidth: 'auto', padding: '0'}"
>
    <v-icon
        :icon="modeStore.darkMode ? 'mdi-moon-waning-crescent' : 'mdi-weather-sunny'"
        :color="modeStore.darkMode ? 'white' : 'orange'"
        size="xx-large"
    ></v-icon>
</v-btn>
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
})
</script>
