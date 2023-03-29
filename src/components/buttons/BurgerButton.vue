<template>
    <div class="burger-menu">
        <div v-if="open" class="burger-menu-items">
            <slot></slot>
        </div>
        <button @click="setMenuOpen">
            <img alt="Hamburger" :src="assetspath('./ui/menu.webp')" />
        </button>
    </div>
</template>

<script lang="ts">
// Import global APIs & libraries
import { defineComponent } from 'vue'
// Import mixins
import { fetchImages } from '@/mixins/fetchImages'

export default defineComponent({
  data () {
    return {
      open: false
    }
  },
  methods: {
    setMenuOpen () {
      this.open = !this.open
    }
  },
  mixins: [fetchImages]
})
</script>

<style scoped lang="scss">
.burger-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 35vw;
    max-width: 200px;

    .burger-menu-items {
        display: grid;
    }

    button {
        padding: 10px;

        img {
            width: 90px;
            height: 30px;
        }
    }
}
</style>
