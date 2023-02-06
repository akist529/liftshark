<template>
    <button>
        <span>Log In</span>
        <div>
          <img alt="Log In" :src="assetspath('./ui/sidebar/login.webp')" />
        </div>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fetchImages } from '@/mixins/fetchImages'

export default defineComponent({
  mixins: [fetchImages]
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
