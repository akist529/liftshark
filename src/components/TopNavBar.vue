<template>
  <div class="top-navbar">
    <ModeButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fetchImages } from '@/mixins/fetchImages'
import ModeButton from '@/components/buttons/ModeButton.vue'

export default defineComponent({
  components: {
    ModeButton
  },
  mixins: [fetchImages]
})
</script>

<style lang="scss">
.top-navbar {
  grid-row: 1 / 2;
  grid-column: 1 / -1;

  padding: 10px 5px;
  width: 100%;

  background: rgb(20, 20, 20);

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    filter: invert(1);
  }
}
</style>
