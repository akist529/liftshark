<template>
<v-layout>
    <TabletNavBar />
    <TopNavBar />
    <router-view
    ></router-view>
</v-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TabletNavBar from '../navbars/TabletNavBar.vue';
import TopNavBar from '../navbars/TopNavBar.vue';

export default defineComponent({
    components: {
        TabletNavBar,
        TopNavBar
    }
})
</script>
