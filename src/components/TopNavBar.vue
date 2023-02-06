<template>
  <div class="top-navbar">
    <ModeButton />
    <LogButton @click="$emit('openModal')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fetchImages } from '@/mixins/fetchImages'
import ModeButton from '@/components/buttons/ModeButton.vue'
import LogButton from '@/components/buttons/LogButton.vue'

export default defineComponent({
  components: {
    ModeButton,
    LogButton
  },
  mixins: [fetchImages]
})
</script>

<style scoped lang="scss">
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
