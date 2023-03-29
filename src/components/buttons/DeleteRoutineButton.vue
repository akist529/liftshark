<template>
    <button>
        <img alt="Delete Routine" :src="assetspath('./ui/close.svg')" />
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 0;
  right: 0;

  img {
    width: 24px;
  }
}
</style>
