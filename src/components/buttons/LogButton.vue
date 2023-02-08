<template>
    <button>
        <span v-if="userLoggedIn">Log Out</span>
        <span v-if="!userLoggedIn">Log In</span>
        <div>
          <img v-if="userLoggedIn" alt="Log Out" :src="assetspath('./ui/sidebar/logout.webp')" />
          <img v-if="!userLoggedIn" alt="Log In" :src="assetspath('./ui/sidebar/login.webp')" />
        </div>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fetchImages } from '@/mixins/fetchImages'
import Cookies from 'js-cookie'

export default defineComponent({
  data () {
    return {
      Cookies
    }
  },
  mixins: [fetchImages],
  props: {
    userLoggedIn: Boolean
  }
})
</script>

<style scoped lang="scss">
button {
  display: grid;
  grid-template-columns: 60px 30px;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  overflow: hidden;

  span {
    font-family: var(--title-font);
  }

  div {
    background-color: var(--button-bg-color);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      filter: invert(1);
      width: 100%;
      height: 100%;
      padding: 5px;
    }
  }
}
</style>
