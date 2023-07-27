<template>
<ModalBackground>
<dialog open class="LoginModal">
	<h1>Sign In</h1>
	<div class="login-functions">
		<button
			id="btn-login"
			@click="loginStore.setLoggingIn" :class="loginStore.loggingIn ? 'btn-active' : null"
		>Login</button>
		<button
			id="btn-register"
			@click="loginStore.setRegistering" :class="!loginStore.loggingIn ? 'btn-active' : null"
		>Register</button>
	</div>
	<CloseButton
		@click="loginStore.toggleLoginModal" />
	<form>
		<label v-if="!loggingUserIn" for="username">Username:</label><br/>
		<input v-if="!loggingUserIn" v-model="username"
			type="text"
			id="username"
			name="username" />
		<label for="email">E-Mail:</label><br/>
		<input v-model="email"
			type="email"
			id="email"
			name="email" />
		<label for="password">Password:</label><br/>
		<div class="form-password">
			<input v-model="password"
				:type="showPassword ? 'text' : 'password'"
				id="password"
				name="password" />
			<button
				id="pw-toggle"
				:title="showPassword ? 'Hide Password' : 'Show Password'"
				:style="{backgroundImage: `url(images/icons/visibility${showPassword ? '_off' : ''}.svg)`}"
				@click="togglePasswordVisibility"
			></button>
		</div>
	</form>
	<button
		id="submit"
		@click="loginStore.loggingIn ? loginStore.loginUser(email, password) : loginStore.registerUser(username, email, password)"
	>{{ loginStore.loggingIn ? 'Log In' : 'Sign Up' }}
	</button>
	<strong v-if="error" id="errorMessage">{{ errorMessage }}</strong>
</dialog>
</ModalBackground>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// Pinia stores
import { useLoginStore } from '@/stores/loginStore';
// Local components
import ModalBackground from '@/components/ModalBackground.vue';
import CloseButton from '@/components/buttons/CloseButton.vue';

export default defineComponent({
	components: {
		ModalBackground,
		CloseButton
	},
	data () {
		const username = '';
		const email = '';
		const password = '';
		const errorMessage = '';
		const loginStore = useLoginStore();
		const showPassword = false;

		return ({
			username,
			email,
			password,
			errorMessage,
			loggingUserIn: true,
			error: false,
			loginStore,
			showPassword
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
	/* Positioning */
	display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	position: fixed;
		top: 50%;
		left: 50%;
	transform: translate(-50%, -50%);
	width: 80vw;
	height: 80vh;

	/* Visual */
	background-color: rgb(255, 255, 255);
	padding: 15px;
	border: none;
	border-radius: 20px;
	filter: drop-shadow(10px 10px 10px rgba(0,0,0,0.5));
	font-family: 'Karla';
	text-transform: uppercase;

	.login-functions {
		/* Positioning */
		display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 10px;
		position: relative;

		/* Visual */
		background-color: rgb(200,200,200);
		border: 2px solid rgb(175,175,175);
		padding: 20px 10px;

		button {
			/* Positioning */
			display: grid;
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 1fr;
				align-items: center;
			width: 100%;

			/* Visual */
			background: white;
			border: none;
			border-radius: 30px;
			font-size: 1.25rem;
			padding: 10px 20px;
			cursor: pointer;
		}

		button:hover {
			background: rgb(200,200,200);
			box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
		}

		.btn-active {
			background: var(--button-bg-color-hover);
			color: white;
			border: 2px solid rgb(90, 90, 255);

			&::before {
				filter: invert(1);
			}
		}

		#btn-login {
			&::before {
				display: inline-block;
				content: '';
				width: 32px;
				height: 32px;
				background-image: url('/public/images/icons/person.svg');
				background-repeat: no-repeat;
				background-size: contain;
			}
		}

		#btn-register {
			&::before {
				display: inline-flex;
				content: '';
				width: 32px;
				height: 32px;
				background-image: url('/public/images/icons/person_add.svg');
				background-repeat: no-repeat;
				background-size: contain;
			}
		}
	}

	form {
		display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

		.form-password {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 5px;

			#pw-toggle {
				background: none;
				border: none;
				cursor: pointer;
				background-repeat: no-repeat;
				background-size: contain;
				content: '';
				width: 16px;
				height: 16px;
			}
		}
	}

	#submit {
		/* Positioning */
		width: 100%;

		/* Visual */
		background-color: var(--button-bg-color);
		padding: 10px;
		cursor: pointer;

		/* Textography */
		color: white;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 18px;
	}

	#errorMessage {
		font-size: 1rem;
		text-align: center;
		color: var(--error-color);
	}
}
</style>
