<template>
<v-app-bar
    :elevation="2"
    color="blue-grey-darken-4"
    density="compact"
    scroll-behavior="hide"
>
    <v-app-bar-nav-icon
        width="auto"
        height="auto"
        variant="plain"
    >
        <ModeButton />
    </v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <LoginModal v-if="!loginStore.token" />
    <LogoutModal v-else />
    <v-spacer></v-spacer>
    <v-app-bar-title
        v-if="windowStore.width >= 1460"
        class="flex text-center"
    >
        <v-icon
            icon="mdi-dumbbell"
        ></v-icon>
        Gym Tracker
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn
        class="h-100 rounded-0"
        to="/"
    >
        <v-icon>mdi-home</v-icon>
        <span>Home</span>
    </v-btn>
    <v-btn
        class="h-100 rounded-0"
        to="/workouts"
    >
        <v-icon>mdi-weight-lifter</v-icon>
        <span>Workouts</span>
    </v-btn>
    <v-btn
        class="h-100 rounded-0"
        to="/routines"
    >
        <v-icon>mdi-notebook</v-icon>
        <span>Routines</span>
    </v-btn>
    <v-btn
        class="h-100 rounded-0"
        to="/stats"
    >
        <v-icon>mdi-account-search</v-icon>
        <span>Stats</span>
    </v-btn>
    <v-btn
        class="h-100 rounded-0"
        to="/exercises"
    >
        <v-icon>mdi-dumbbell</v-icon>
        <span>Exercises</span>
    </v-btn>
</v-app-bar>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Local components
import ModeButton from '../buttons/ModeButton.vue';
import LoginModal from '../modals/LoginModal.vue';
import LogoutModal from '../modals/LogoutModal.vue';
// Pinia stores
import { useLoginStore } from '@/stores/loginStore';
import { useWindowStore } from '@/stores/windowStore';
// Third-party libraries
import Cookies from 'js-cookie';

export default defineComponent({
    data () {
        return ({
            loginStore: useLoginStore(),
            windowStore: useWindowStore(),
            token: Cookies.get('token')
        });
    },
    components: {
        ModeButton,
        LoginModal,
        LogoutModal
    }
});
</script>
