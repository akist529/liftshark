<template>
<v-dialog
	scrollable
	persistent
	v-model="dialog"
	max-width="400px"
>
    <template v-slot:activator="{ props }">
        <v-btn
            v-bind="props"
            class="bg-primary"
            variant="flat"
            :style="{minWidth: 'auto', padding: '0 8px'}"
        >
            <span
                v-if="(windowStore.width > 470 && windowStore.width <= 992) || windowStore.width >= 1100"
				class="mr-1"
			>Log Out</span>
			<v-icon
				icon="mdi-logout"
				size="large"
			></v-icon>
        </v-btn>
    </template>
    <v-card
        :class="modeStore.darkMode ? 'bg-blue-grey-darken-3 d-flex justify-center align-center pa-2 rounded-lg' : 'bg-blue-grey-lighten-3 d-flex justify-center align-center pa-2 rounded-lg'"
	>
        <v-card-text>Are you sure you want to log out?</v-card-text>
        <v-card-actions>
            <v-btn
                prepend-icon="mdi-check"
                class="bg-success"
                @click="logout"
            >YES</v-btn>
            <v-btn
                prepend-icon="mdi-close"
                class="bg-error"
                @click="dialog = false"
            >NO</v-btn>
            <CloseButton
                @click="dialog = false"
            />
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Local components
import CloseButton from '../buttons/CloseButton.vue';
// Pinia stores
import { useLoginStore } from '@/stores/loginStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
import { useWindowStore } from '@/stores/windowStore';
import { useModeStore } from '@/stores/modeStore';

export default defineComponent({
    data () {
        return ({
            loginStore: useLoginStore(),
            snackbarStore: useSnackbarStore(),
            windowStore: useWindowStore(),
            modeStore: useModeStore(),
            dialog: false
        });
    },
    components: {
        CloseButton
    },
    methods: {
        logout () {
            this.loginStore.token = null;
            this.loginStore.removeToken();
            this.dialog = false;

            this.snackbarStore.text = 'Successfully logged out';
            this.snackbarStore.color = 'success';
            this.snackbarStore.icon = 'mdi-check-circle';
            this.snackbarStore.open = true;
        }
    }
});
</script>
