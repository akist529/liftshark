<template>
<v-toolbar
    class="px-5 py-1"
    :color="modeStore.darkMode ? 'blue-grey-darken-4' : 'blue-lighten-3'"
    density="compact"
    extended
>
    <v-toolbar-title
        class="flex text-center"
    >
        <v-icon
            v-if="isMorning"
            icon="mdi-weather-sunny"
            size="xxx-large"
            class="mr-3"
        ></v-icon>
        <v-icon
            v-else-if="isNoon"
            icon="mdi-weather-cloudy"
            size="xxx-large"
            class="mr-3"
        ></v-icon>
        <v-icon
            v-else
            icon="mdi-weather-night"
            size="xxx-large"
            class="mr-3"
        ></v-icon>
        <span v-if="isMorning">Good morning, Alex!</span>
        <span v-else-if="isNoon">Good afternoon, Alex!</span>
        <span v-else>Good evening, Alex!</span>
    </v-toolbar-title>
</v-toolbar>
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
    },
    computed: {
        isMorning () {
            const hour = new Date().getHours();
            return hour >= 5 && hour < 12;
        },
        isNoon () {
            const hour = new Date().getHours();
            return hour >= 12 && hour < 17;
        }
    }
});
</script>
