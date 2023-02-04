<template>
    <img class="loading-icon" alt="Loading" :src="assetspath('./ui/cached.webp')" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fetchImages } from '@/mixins/fetchImages'

export default defineComponent({
  mixins: [fetchImages]
})
</script>

<style scoped lang="scss">
.loading-icon {
  margin: auto 0;
  animation-name: spin-animation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin-animation {
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
}
</style>
