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
        <ModeSlider />
    </v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <LoginModal v-if="!loginStore.token" />
    <LogoutModal v-else />
    <v-spacer></v-spacer>
    <v-app-bar-title
        class="text-h4 text-uppercase"
    >
        <span>Lift</span>
        <span
            class="shark-icon"
        ></span>
        <span>Shark</span>
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
import ModeSlider from '../buttons/ModeButton/ModeSlider.vue';
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
        ModeSlider,
        LoginModal,
        LogoutModal
    }
});
</script>

<style scoped>
.v-toolbar-title {
    min-width: auto;
    margin-left: 16px;
    margin-right: 16px;
}

.shark-icon {
    background-image: url('/public/shark.webp');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 32px;
    height: 32px;
    content: '';
    display: inline-flex;
    filter: invert(1);
}
</style>
