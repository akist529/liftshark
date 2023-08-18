<template>
<v-layout>
    <TopNavBar />
    <router-view
    ></router-view>
    <MobileNavBar />
</v-layout>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Local components
import MobileNavBar from '../navbars/MobileNavBar.vue';
import TopNavBar from '../navbars/TopNavBar.vue';

export default defineComponent({
    components: {
        MobileNavBar,
        TopNavBar
    }
});
</script>
