<template>
<section>
    <v-list density="compact">
        <v-list-subheader>Exercise data provided by wger</v-list-subheader>
        <v-list-subheader>Icons provided by:</v-list-subheader>
        <v-list-item color="primary">Freepik</v-list-item>
        <v-list-item color="primary">muh zakaria</v-list-item>
        <v-list-item color="primary">nawicon</v-list-item>
        <v-list-item color="primary">Smashicons</v-list-item>
        <v-list-item color="primary">Anggre Tionanda</v-list-item>
        <v-list-item color="primary">Leremy</v-list-item>
    </v-list>
    <MyFooter />
</section>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Local components
import MyFooter from '@/components/MyFooter.vue';

export default defineComponent({
    components: {
        MyFooter
    }
});
</script>
