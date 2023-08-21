<template>
<v-dialog
	scrollable
	persistent
	v-model="dialog"
	class="LoginModal w-100 h-100"
	max-width="400px"
>
	<template v-slot:activator="{ props }">
		<v-btn
			v-bind="props"
			append-icon="mdi-login"
			class="bg-blue-lighten-4"
			variant="tonal"
		>Log In</v-btn>
	</template>
	<v-card
		class="d-flex justify-center align-center pa-3 rounded-lg bg-blue-grey-lighten-3 text-black w-100"
	>
		<v-card-title
			class="d-flex flex-column justify-center align-center w-75"
		>
			<h1>Sign In</h1>
		</v-card-title>
		<v-card-actions>
			<v-btn
				id="btn-login"
				@click="loggingIn = true" :class="loggingIn ? 'btn-active' : null"
				prepend-icon="mdi-login"
				:variant="loggingIn ? 'flat' : 'tonal'"
			>Log In</v-btn>
			<v-btn
				id="btn-register"
				@click="loggingIn = false" :class="!loggingIn ? 'btn-active' : null"
				prepend-icon="mdi-account-plus"
				:variant="loggingIn ? 'tonal' : 'flat'"
			>Register</v-btn>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
		<v-card-text
			class="d-flex justify-center align-center w-100"
		>
			<v-form
				class="d-flex flex-column justify-center w-100"
			>
				<v-text-field
					v-if="!loggingIn"
					variant="underlined"
					prepend-icon="mdi-account"
					v-model="username"
					id="username"
					name="username"
					type="text"
					label="Username"
					clearable
				></v-text-field>
				<v-text-field
					variant="underlined"
					prepend-icon="mdi-email"
					v-model="email"
					id="email"
					name="email"
					type="email"
					label="E-Mail"
					clearable
				></v-text-field>
				<v-container
					class="d-flex justify-center align-center pa-0"
				>
					<v-text-field
						variant="underlined"
						prepend-icon="mdi-lock"
						v-model="password"
						id="password"
						name="password"
						:type="showPassword ? 'text' : 'password'"
						label="Password"
						clearable
					></v-text-field>
					<v-btn
						variant="plain"
						:ripple="false"
						id="pw-toggle"
						width="32px"
						:title="showPassword ? 'Hide Password' : 'Show Password'"
						@click="togglePasswordVisibility">
						<v-icon :icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off'"></v-icon>
					</v-btn>
				</v-container>
				<v-checkbox
					label="Stay logged in"
					v-model="stayLoggedIn"
					@change="changeLogPref"
				></v-checkbox>
			</v-form>
		</v-card-text>
		<v-card-actions>
			<v-btn
				id="submit"
				@click="loggingIn ? loginUser() : registerUser()"
				variant="tonal"
				class="bg-primary"
			>{{ loggingIn ? 'Log In' : 'Sign Up' }}</v-btn>
		</v-card-actions>
		<v-card-text>
			<strong
				v-if="error"
				id="errorMessage"
			>{{ errorMessage }}</strong>
		</v-card-text>
	</v-card>
</v-dialog>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useLoginStore } from '@/stores/loginStore';
import { useWindowStore } from '@/stores/windowStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
// Local components
import CloseButton from '@/components/buttons/CloseButton.vue';
// Third-party libraries
import Cookies from 'js-cookie';

export default defineComponent({
	components: {
		CloseButton
	},
	data () {
		const username = '';
		const email = '';
		const password = '';
		const errorMessage = '';
		const loginStore = useLoginStore();
		const windowStore = useWindowStore();
		const snackbarStore = useSnackbarStore();
		const showPassword = false;
		const token = Cookies.get('token');
		const stayLoggedIn = (Cookies.get('stayLoggedIn') === 'true');

		return ({
			username,
			email,
			password,
			errorMessage,
			loggingIn: true,
			error: false,
			loginStore,
			windowStore,
			snackbarStore,
			showPassword,
			dialog: false,
			token,
			stayLoggedIn
		});
	},
	methods: {
		setError () {
			this.error = true;
		},
		togglePasswordVisibility (e: MouseEvent) {
			e.preventDefault();
			this.showPassword = !this.showPassword;
		},
		loginUser () {
			this.loginStore.loginUser(this.email, this.password);
			this.dialog = false;
			this.snackbarStore.open = true;

			if (!this.loginStore.error) {
				this.snackbarStore.text = `Welcome back, ${this.username}!`;
				this.snackbarStore.color = 'success';
				this.snackbarStore.icon = 'mdi-check-circle';
			} else {
				this.snackbarStore.text = 'Failed to log in';
				this.snackbarStore.color = 'error';
				this.snackbarStore.icon = 'mdi-alert-circle';
			}
		},
		registerUser () {
			this.loginStore.registerUser(this.username, this.email, this.password);
			this.dialog = false;
			this.snackbarStore.open = true;

			if (!this.loginStore.error) {
				this.snackbarStore.text = `Welcome, ${this.username}!`;
				this.snackbarStore.color = 'success';
				this.snackbarStore.icon = 'mdi-check-circle';
			} else {
				this.snackbarStore.text = 'Failed to register new user';
				this.snackbarStore.color = 'error';
				this.snackbarStore.icon = 'mdi-alert-circle';
			}
		},
		changeLogPref () {
			if (this.stayLoggedIn) {
				Cookies.set('stayLoggedIn', true);
			} else {
				Cookies.set('stayLoggedIn', false);
			}
		}
	}
});
</script>

<style scoped lang="scss">
.LoginModal {
	/* Visual */
	font-family: 'Karla';
	text-transform: uppercase;

	.v-btn {
		min-width: 0;
	}
}
</style>
