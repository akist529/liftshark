<template>
<v-dialog scrollable persistent v-model="dialog" class="LoginModal w-100 h-100" max-width="400px">
	<template v-slot:activator="{ props }">
		<v-btn v-bind="props" append-icon="mdi-login" class="bg-blue-lighten-4" variant="tonal">
			Log In
		</v-btn>
	</template>
	<v-card class="d-flex justify-center align-center pa-3 rounded-lg bg-blue-grey-lighten-3 text-black w-100">
		<v-card-title class="d-flex flex-column justify-center align-center w-75">
			<h1>Sign In</h1>
		</v-card-title>
		<v-card-actions>
			<v-btn
				id="btn-login"
				@click="loggingIn = true" :class="loginStore.loggingIn ? 'btn-active' : null"
			>Log In</v-btn>
			<v-btn
				id="btn-register"
				@click="loggingIn = false" :class="!loginStore.loggingIn ? 'btn-active' : null"
			>Register</v-btn>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
		<v-card-text class="d-flex justify-center align-center w-100">
			<v-form class="d-flex flex-column justify-center w-100">
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
				<v-container class="d-flex justify-center align-center pa-0">
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
						<v-icon :icon="showPassword ? 'mdi-eye-off' : 'mdi-eye-outline'"></v-icon>
					</v-btn>
				</v-container>
			</v-form>
		</v-card-text>
		<v-card-actions>
			<v-btn
				id="submit"
				@click="loginStore.loggingIn ? loginStore.loginUser(email, password) : loginStore.registerUser(username, email, password)"
			>{{ loginStore.loggingIn ? 'Log In' : 'Sign Up' }}</v-btn>
		</v-card-actions>
		<v-card-text>
			<strong v-if="error" id="errorMessage">{{ errorMessage }}</strong>
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
		const showPassword = false;
		const token = Cookies.get('token');

		return ({
			username,
			email,
			password,
			errorMessage,
			loggingIn: true,
			error: false,
			loginStore,
			windowStore,
			showPassword,
			dialog: false,
			token
		});
	},
	methods: {
		setError () {
			this.error = true;
		},
		togglePasswordVisibility (e: MouseEvent) {
			e.preventDefault();
			this.showPassword = !this.showPassword;
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
