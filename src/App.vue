<template>
  <TopNavBar
    v-if="windowWidth <= 480"
    @openLoginModal="openLoginModal"
    @openWarningModal="openWarningModal"
    :userToken = userToken
  />
  <router-view id="router-view" :key="$route.fullPath" />
  <NavBar />
  <LoginModal
    v-if="loginModalOpen"
    :loginModalOpen="loginModalOpen"
    @closeLoginModal="closeLoginModal"
    :userToken = userToken
  />
  <WarningModal
    v-if="warningModalOpen"
    :warningModalOpen="warningModalOpen"
    @closeWarningModal="closeWarningModal"
    @yes="logUserOut"
  >
    <span>Are you sure you want to log out?</span>
  </WarningModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/NavBar.vue'
import TopNavBar from '@/components/TopNavBar.vue'
import LoginModal from '@/components/LoginModal.vue'
import WarningModal from '@/components/WarningModal.vue'
import Cookies from 'js-cookie'

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    TopNavBar,
    LoginModal,
    WarningModal
  },
  data () {
    const windowWidth: number = window.innerWidth
    const userToken: string = Cookies.get('token')
    const loginModalOpen = false
    const warningModalOpen = false

    return {
      windowWidth,
      userToken,
      loginModalOpen,
      warningModalOpen
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  methods: {
    onResize () {
      this.windowWidth = window.innerWidth
    },
    closeLoginModal () {
      this.loginModalOpen = false
    },
    openLoginModal () {
      this.loginModalOpen = true
    },
    closeWarningModal () {
      this.warningModalOpen = false
    },
    openWarningModal () {
      this.warningModalOpen = true
    },
    logUserOut () {
      Cookies.remove('token')
      this.closeWarningModal()
    },
    updateUserToken () {
      if (this.userToken !== Cookies.get('token')) {
        this.userToken = Cookies.get('token')
      }
    }
  },
  created () {
    window.setInterval(this.updateUserToken, 100)
  }
})
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

  /*
  MAX PHONE WIDTH: 480px
  MAX TABLET WIDTH: 1024px
  DESKTOP WIDTH: >1024px
  */
</style>
