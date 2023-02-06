<template>
    <div class="modal-bg">
        <div class="login-modal">
            <span>Log In</span>
            <form>
                <CloseButton @click="$emit('closeModal')" />
                <label for="email">E-Mail:</label><br/>
                <input v-model="email" type="email" id="email" name="email" />
                <label for="password">Password:</label><br/>
                <input v-model="password" type="password" id="password" name="password" />
            </form>
            <button @click="loginUser" id="submit">Log In</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fetchData } from '@/mixins/fetchData'
import CloseButton from '@/components/buttons/CloseButton.vue'
import axios from 'axios'

export default defineComponent({
  components: {
    CloseButton
  },
  props: {
    loginModalOpen: Boolean
  },
  mixins: [fetchData],
  data () {
    const email = ''
    const password = ''

    return {
      email,
      password
    }
  },
  methods: {
    async loginUser () {
      await axios.post('http://localhost:1337/api/auth/local', {
        identifier: this.email,
        password: this.password
      }).then(response => {
        console.log(response.data.user)
        console.log(response.data.jwt)
      }).catch(error => {
        console.log(error.response)
      })
    }
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
        }

        #submit {
            width: 100%;
            background-color: var(--button-bg-color);
        }
    }
}
</style>
