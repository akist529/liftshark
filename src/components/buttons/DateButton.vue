<template>
    <div class="DateButton">
        <BackButton />
        <button></button>
        <ForwardButton />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BackButton from '@/components/buttons/BackButton.vue'
import ForwardButton from '@/components/buttons/ForwardButton.vue'

export default defineComponent({
  components: {
    BackButton,
    ForwardButton
  },
  created () {
    for (let i = 0; i < 25; i++) {
      if (9 % i === 0 && 16 % i === 0 && 25 % i === 0) {
        console.log(i)
      }
    }
  }
})
</script>

<style lang="scss">
.DateButton {
  display: flex;
}
</style>
