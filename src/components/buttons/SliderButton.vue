<template>
    <div class="slider-btn">
        <div :class="getState()"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    darkMode: Boolean
  },
  methods: {
    getState () {
      if (this.darkMode) {
        return 'slider dark'
      } else {
        return 'slider light'
      }
    }
  }
})
</script>

<style lang="scss">
.slider-btn {
    background-color: rgb(255, 255, 255);
    width: 40px;
    height: 20px;
    border-radius: 10px;

    display: flex;
    align-items: center;
    position: relative;

    .slider {
        background-color: rgb(0, 0, 0);
        width: 15px;
        height: 15px;
        border-radius: 50%;
        position: absolute;
        transition: 1s;
    }

    .light {
        animation-name: darkToLight;
        animation-duration: 0.25s;
        animation-fill-mode: forwards;
    }

    .dark {
        animation-name: lightToDark;
        animation-duration: 0.25s;
        animation-fill-mode: forwards;
    }

    @keyframes lightToDark {
        from {
            left: 0px;
        } to {
            left: 25px;
        }
    }

    @keyframes darkToLight {
        from {
            left: 25px;
        } to {
            left: 0px;
        }
    }
}
</style>
