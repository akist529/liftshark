<template>
  <ModalBackground>
    <div class="warning-modal">
        <CloseButton @click="$emit('handleWarningModal')" />
        <strong>
            <slot></slot>
        </strong>
        <div class="warning-btns">
          <StrongButton @click="$emit('yes')">YES</StrongButton>
          <GenericButton @click="$emit('handleWarningModal')">NO</GenericButton>
        </div>
    </div>
  </ModalBackground>
</template>

<script scoped lang="ts">
import { defineComponent } from 'vue'
import ModalBackground from '@/components/ModalBackground.vue'
import CloseButton from '@/components/buttons/CloseButton.vue'
import StrongButton from '@/components/buttons/StrongButton.vue'
import GenericButton from '@/components/buttons/GenericButton.vue'

export default defineComponent({
  components: {
    ModalBackground,
    CloseButton,
    StrongButton,
    GenericButton
  }
})
</script>

<style scoped lang="scss">
.warning-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 40vh;
  background-color: rgb(255, 255, 255);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;

  .warning-btns {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
}
</style>
