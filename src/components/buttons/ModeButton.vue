<template>
    <button class="display-mode-btn" @click="changeState">
        <img alt="Light Mode" :class="darkMode ? 'inactive' : 'active'" :src="assetspath('./ui/sidebar/light_mode.webp')" />
        <SliderButton :darkMode="darkMode" />
        <img alt="Dark Mode" :class="darkMode ? 'active' : 'inactive'" :src="assetspath('./ui/sidebar/dark_mode.webp')" />
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fetchImages } from '@/mixins/fetchImages'
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
      filter: invert(1) opacity(0.3);
    }

    .active {
      filter: invert(1) opacity (1);
    }
}
</style>
