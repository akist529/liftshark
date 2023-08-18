<template>
<v-layout>
    <TabletNavBar />
    <router-view
    ></router-view>
</v-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TabletNavBar from '../navbars/TabletNavBar.vue';

export default defineComponent({
    components: {
        TabletNavBar
    }
})
</script>
