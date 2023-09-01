<template>
<v-banner
    icon="mdi-lock"
    :color="modeStore.darkMode ? 'white' : 'black'"
    :class="modeStore.darkMode ? 'bg-blue-grey-darken-4 px-4 py-2' : 'bg-blue-lighten-3 px-4 py-2'"
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
// Pinia stores
import { useModeStore } from '@/stores/modeStore';

export default defineComponent({
    data () {
        return ({
            modeStore: useModeStore()
        });
    },
    components: {
        LoginModal
    }
});
</script>
