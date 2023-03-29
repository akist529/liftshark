<template>
    <div class="my-stats">
        <h1>My Statistics</h1>
        <nav>
            <ul>
                <li v-for="page in statPages" :key="page">
                    <button @click="setPageShown(page)" :class="isPageShown(page) ? 'page-active' : 'page-inactive'">{{ page }}</button>
                </li>
            </ul>
            <hr/>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    const statPages = ['Weight', 'Measurements', 'PRs']
    const pageShown = 'Measurements'

    return {
      statPages,
      pageShown
    }
  },
  methods: {
    setPageShown (page: string) {
      sessionStorage.setItem('statPageShown', page)
      this.pageShown = page
    },
    isPageShown (page: string) {
      if (page === this.pageShown) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.pageShown = sessionStorage.getItem('statPageShown') || 'Measurements'
  }
})
</script>

<style lang="scss">
.my-stats {
    display: flex;
    flex-direction: column;

    nav {
        ul {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            justify-items: center;
            align-items: center;
            list-style-type: none;
            font-size: 16px;
            width: 300px;
            position: relative;
            background: rgb(215, 215, 215);
            border: 3px solid rgb(175, 175, 175);

            li {
                position: relative;
                width: 100%;

                button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 5px;
                    position: relative;
                    width: 100%;
                }

                .page-active {
                    font-size: 16px;
                    font-weight: 700;
                    background: rgb(195,195,195);
                }
            }
        }
    }
}
</style>
