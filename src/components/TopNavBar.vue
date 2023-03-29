<template>
  <div class="top-navbar">
    <ModeButton />
    <LogButton
      :userToken = userToken
      @click="handleLogButton"
    />
  </div>
</template>

<script lang="ts">
// Import global APIs & libraries
import { defineComponent } from 'vue'
import Cookies from 'js-cookie'
// Import mixins
import { fetchImages } from '@/mixins/fetchImages'
// Import components
import ModeButton from '@/components/buttons/ModeButton.vue'
import LogButton from '@/components/buttons/LogButton.vue'

export default defineComponent({
  components: {
    ModeButton,
    LogButton
  },
  mixins: [fetchImages],
  methods: {
    handleLogButton () {
      if (Cookies.get('token')) {
        this.$emit('handleWarningModal')
      } else {
        this.$emit('handleLoginModal')
      }
    }
  },
  props: {
    userToken: String
  }
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
  position: relative;
  z-index: 1;

  img {
    filter: invert(1);
  }
}
</style>
