<template>
<v-banner
    icon="mdi-lock"
    color="deep-purple-accent-4"
    class="bg-blue-lighten-3 pa-3"
>
    <v-banner-text>Create an account or log in to safely secure your data and use Gym Tracker from any device!</v-banner-text>
    <v-banner-actions class="my-0">
        <LoginModal />
    </v-banner-actions>
</v-banner>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Local components
import LoginModal from '../../components/modals/LoginModal.vue';

export default defineComponent({
    components: {
        LoginModal
    }
})
</script>
