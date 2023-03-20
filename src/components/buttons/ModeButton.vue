<template>
    <button class="display-mode-btn" @click="changeState">
        <img alt="Light Mode" :class="darkMode ? 'inactive' : 'active'" :src="assetspath('./ui/sidebar/light_mode.webp')" />
        <SliderButton :darkMode="darkMode" />
        <img alt="Dark Mode" :class="darkMode ? 'active' : 'inactive'" :src="assetspath('./ui/sidebar/dark_mode.webp')" />
    </button>
</template>

<script lang="ts">
// Import global APIs & libraries
import { defineComponent } from 'vue'
// Import mixins
import { fetchImages } from '@/mixins/fetchImages'
// Import components
import SliderButton from '@/components/buttons/SliderButton.vue'

export default defineComponent({
  mixins: [fetchImages],
  components: {
    SliderButton
  },
  data () {
    return {
      darkMode: false
    }
  },
  methods: {
    changeState () {
      this.darkMode = !this.darkMode
    }
  }
})
</script>

<style scoped lang="scss">
.display-mode-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    background: none;
    border: none;
    cursor: pointer;

    img {
        max-height: 25px;
    }

    .inactive {
      filter: invert(1) opacity(30%);
    }

    .active {
      filter: invert(1) opacity(100%);
    }
}
</style>
