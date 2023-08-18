<template>
<v-layout>
    <DesktopNavBar />
    <router-view
    ></router-view>
</v-layout>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Local components
import DesktopNavBar from '../navbars/DesktopNavBar.vue';

export default defineComponent({
    components: {
        DesktopNavBar
    }
});
</script>
