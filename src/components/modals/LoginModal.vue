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
			>Log In</span>
			<v-icon
				icon="mdi-login"
				size="large"
			></v-icon>
		</v-btn>
	</template>
	<v-card
		:class="modeStore.darkMode ? 'bg-blue-grey-darken-3 d-flex justify-center align-center pa-2 rounded-lg' : 'bg-blue-grey-lighten-3 d-flex justify-center align-center pa-2 rounded-lg'"
	>
		<v-card-title
			class="d-flex justify-center text-uppercase pa-3"
		>
			<v-icon
				icon="mdi-login-variant"
				size="xx-large"
				class="mr-1"
			></v-icon>
			Sign In
		</v-card-title>
		<v-card-actions
			class="w-100 pa-0"
			:style="{minHeight: 0}"
		>
			<v-tabs
				v-model="tab"
				fixed-tabs
				class="w-100"
				bg-color="primary"
			>
				<v-tab
					value="login"
					prepend-icon="mdi-login"
				>Log In</v-tab>
				<v-tab
					value="register"
					prepend-icon="mdi-account-plus"
					:style="{marginInlineStart: 0}"
				>Register</v-tab>
			</v-tabs>
			<CloseButton
				@click="dialog = false"
			/>
		</v-card-actions>
		<v-card-text
			class="d-flex justify-center align-center w-100"
		>
			<v-window v-model="tab" class="w-100">
				<v-window-item value="login" class="w-100">
					<v-form
						class="d-flex flex-column justify-center w-100"
					>
						<v-text-field
							variant="underlined"
							prepend-icon="mdi-email"
							v-model="email"
							id="email"
							name="email"
							type="email"
							label="E-Mail"
							class="w-100"
							clearable
						></v-text-field>
						<v-container
							class="pa-0 w-100"
						>
							<v-row>
								<v-col :cols="10">
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
								</v-col>
								<v-col :cols="2" class="d-flex justify-center align-center">
									<v-btn
										variant="plain"
										:ripple="false"
										id="pw-toggle"
										width="32px"
										:title="showPassword ? 'Hide Password' : 'Show Password'"
										@click="togglePasswordVisibility">
										<v-icon :icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off'"></v-icon>
									</v-btn>
								</v-col>
							</v-row>
						</v-container>
						<v-checkbox
							label="Stay logged in"
							v-model="stayLoggedIn"
							@change="changeLogPref"
						></v-checkbox>
					</v-form>
				</v-window-item>
				<v-window-item value="register">
					<v-form
						class="d-flex flex-column justify-center w-100"
					>
						<v-text-field
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
				</v-window-item>
			</v-window>
			<strong
				v-if="error"
				id="errorMessage"
			>{{ errorMessage }}</strong>
		</v-card-text>
		<v-card-actions class="pa-0">
			<v-window v-model="tab" class="w-100">
				<v-window-item value="login">
					<v-btn
						id="submit"
						@click="loginUser"
						variant="tonal"
						class="bg-primary w-100 rounded-0"
						size="x-large"
						prepend-icon="mdi-login"
					>Log In</v-btn>
				</v-window-item>
				<v-window-item value="register">
					<v-btn
						id="submit"
						@click="registerUser"
						variant="tonal"
						class="bg-primary w-100 rounded-0"
						size="x-large"
						prepend-icon="mdi-account-plus"
					>Sign Up</v-btn>
				</v-window-item>
			</v-window>
		</v-card-actions>
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
import { useModeStore } from '@/stores/modeStore';
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
		const modeStore = useModeStore();
		const showPassword = false;
		const token = Cookies.get('token');
		const stayLoggedIn = (Cookies.get('stayLoggedIn') === 'true');

		return ({
			username,
			email,
			password,
			errorMessage,
			error: false,
			loginStore,
			windowStore,
			snackbarStore,
			modeStore,
			showPassword,
			dialog: false,
			token,
			stayLoggedIn,
			tab: 'login'
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

			if (!this.loginStore.error) {
				this.snackbarStore.text = `Welcome back, ${this.email}!`;
				this.snackbarStore.color = 'success';
				this.snackbarStore.icon = 'mdi-check-circle';
			} else {
				this.snackbarStore.text = 'Failed to log in';
				this.snackbarStore.color = 'error';
				this.snackbarStore.icon = 'mdi-alert-circle';
			}

			this.dialog = false;
			this.snackbarStore.open = true;
		},
		registerUser () {
			this.loginStore.registerUser(this.username, this.email, this.password);

			if (!this.loginStore.error) {
				this.snackbarStore.text = `Welcome, ${this.username}!`;
				this.snackbarStore.color = 'success';
				this.snackbarStore.icon = 'mdi-check-circle';
			} else {
				this.snackbarStore.text = 'Failed to register new user';
				this.snackbarStore.color = 'error';
				this.snackbarStore.icon = 'mdi-alert-circle';
			}

			this.dialog = false;
			this.snackbarStore.open = true;
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
