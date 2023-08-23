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
            append-icon="mdi-logout"
            class="bg-primary"
            variant="flat"
        >Log Out</v-btn>
    </template>
    <v-card
		class="rounded-lg bg-blue-grey-lighten-3"
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

export default defineComponent({
    data () {
        return ({
            loginStore: useLoginStore(),
            snackbarStore: useSnackbarStore(),
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
