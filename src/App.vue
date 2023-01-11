<template>
  <div id="App">
    <SideBar />
    <router-view id="router-view" />
  </div>
</template>

<script lang="ts">
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'App',
  components: {
    SideBar
  }
}
</script>

<style lang="scss">
  #App {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 300px 1fr;

    #router-view {
      grid-row: 2 / 3;
      grid-column: 2 / 3;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
