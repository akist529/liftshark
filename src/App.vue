<template>
<TopNavBar v-if="windowWidth <= 480"
	@handleLoginModal="handleLoginModal"
	@handleWarningModal="handleWarningModal"
	:userToken = userToken />
<router-view
	id="router-view"
	:key="$route.fullPath" />
<NavBar />
<LoginModal v-if="loginModalOpen"
	:loginModalOpen="loginModalOpen"
	@handleLoginModal="handleLoginModal"
	:userToken = userToken />
<WarningModal v-if="warningModalOpen"
	:warningModalOpen="warningModalOpen"
	@handleWarningModal="handleWarningModal"
	@yes="logUserOut">
	<span>Are you sure you want to log out?</span>
</WarningModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cookies from 'js-cookie';
// Local components
import NavBar from '@/components/NavBar.vue';
import TopNavBar from '@/components/TopNavBar.vue';
import LoginModal from '@/components/LoginModal.vue';
import WarningModal from '@/components/WarningModal.vue';

export default defineComponent({
	name: 'App',
	components: {
		NavBar,
		TopNavBar,
		LoginModal,
		WarningModal
	},
	data () {
		const windowWidth: number = window.innerWidth;
		const userToken: string = Cookies.get('token');
		const loginModalOpen: boolean = JSON.parse(sessionStorage.getItem('loginModalOpen') || 'false');
		const warningModalOpen: boolean = JSON.parse(sessionStorage.getItem('warningModalOpen') || 'false');

		return ({
			windowWidth,
			userToken,
			loginModalOpen,
			warningModalOpen
		});
	},
	mounted () {
		this.$nextTick(() => {
			window.addEventListener('resize', this.onResize);
		});
	},
	methods: {
		onResize () {
			this.windowWidth = window.innerWidth;
		},
		handleLoginModal () {
			sessionStorage.setItem('loginModalOpen', JSON.stringify(!this.loginModalOpen));
		},
		handleWarningModal () {
			sessionStorage.setItem('warningModalOpen', JSON.stringify(!this.warningModalOpen));
		},
		logUserOut () {
			Cookies.remove('token');
			this.handleWarningModal();
		},
		updateUserToken () {
			this.userToken = Cookies.get('token');
		},
		updateLoginModal () {
			this.loginModalOpen = (sessionStorage.getItem('loginModalOpen') === 'true');
		},
		updateWarningModal () {
			this.warningModalOpen = (sessionStorage.getItem('warningModalOpen') === 'true');
		}
	},
	created () {
		window.setInterval(() => {
			this.updateUserToken();
			this.updateLoginModal();
			this.updateWarningModal();
		}, 100);
	}
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:500');
@import url('https://fonts.googleapis.com/css?family=Karla:300,500,700');

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

:root {
	--title-font: 'Roboto';
	--content-font: 'Karla';
	--button-bg-color: rgb(66, 103, 178);
	--button-bg-color-hover: rgb(84, 115, 177);
	--error-color: rgb(160, 0, 0);
}

#app {
	display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
	height: 100vh;
	overflow: hidden;
	position: relative;

	#router-view {
		grid-row: 2 / 3;
		grid-column: 1 / -1;

		display: flex;
			flex-direction: column;
			align-items: center;
		padding: 20px;
		overflow-x: hidden;
		overflow-y: scroll;

		font-family: var(--content-font);

		position: relative;
			z-index: 2;
	}
}

@media (width > 480px) {
	#app {
		grid-template-columns: auto 1fr;
		grid-template-rows: 1fr;

		#router-view {
			grid-row: 1 / -1;
			grid-column: 2 / 3;
		}
	}
}

@media (width > 1024px) {
	#app {
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;

		#router-view {
			grid-row: 2 / 3;
			grid-column: 1 / -1;
		}
	}
}
</style>
