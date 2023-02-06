<template>
    <div class="modal-bg">
        <div class="login-modal">
            <span>Log In</span>
            <form>
                <CloseButton @click="$emit('closeModal')" />
                <label for="email">E-Mail:</label><br/>
                <input type="email" id="email" name="email" />
                <label for="password">Password:</label><br/>
                <input type="password" id="password" name="password" />
                <input type="submit" id="submit" value="Log In" />
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CloseButton from '@/components/buttons/CloseButton.vue'

export default defineComponent({
  components: {
    CloseButton
  },
  props: {
    loginModalOpen: Boolean
  }
})
</script>

<style scoped lang="scss">
.modal-bg {
    background-color: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

    .login-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80vw;
        height: 80vh;
        background-color: rgb(255, 255, 255);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            #submit {
                width: 100%;
                background-color: var(--button-bg-color);
            }
        }
    }
}
</style>
