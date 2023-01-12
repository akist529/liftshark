<template>
  <NavBar />
  <router-view id="router-view" />
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --sidebar-font: 'Roboto';
  }

  #app {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    height: 100vh;

    #router-view {
      grid-row: 1 / 2;
      grid-column: 1 / -1;

      display: flex;
      justify-content: center;
      align-items: center;
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
