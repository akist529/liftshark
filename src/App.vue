<template>
  <router-view id="router-view" :key="$route.fullPath" />
  <NavBar />
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
  }

  #app {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    height: 100vh;
    overflow: hidden;

    #router-view {
      grid-row: 1 / 2;
      grid-column: 1 / -1;

      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      overflow-x: hidden;
      overflow-y: scroll;
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
