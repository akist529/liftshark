<template>
    <nav>
        <ul>
            <li>
                <router-link class="link" to="/">
                    <img alt="Dashboard Icon" :src="require('@/../public/images/ui/sidebar/dashboard.webp')" />
                    <span>Dashboard</span>
                </router-link>
            </li>
            <li>
                <router-link class="link" to="/workouts">
                    <img alt="Workouts Icon" :src="require('@/../public/images/ui/sidebar/workouts.webp')" />
                    <span>Workouts</span>
                </router-link>
            </li>
            <li>
                <router-link class="link" to="/routines">
                    <img alt="Routines Icon" :src="require('@/../public/images/ui/sidebar/routines.webp')" />
                    <span>Routines</span>
                </router-link>
            </li>
            <li v-if="windowWidth <= 480">
                <router-link class="link" to="/stats">
                    <img alt="Stats Icon" :src="require('@/../public/images/ui/sidebar/stats.webp')" />
                    <span>Stats</span>
                </router-link>
            </li>
            <li v-if="windowWidth > 480">
                <router-link class="link" to="/stats/measurements">
                    <img alt="Measurements Icon" :src="require('@/../public/images/ui/sidebar/measurements.webp')" />
                    <span>Measurements</span>
                </router-link>
            </li>
            <li v-if="windowWidth > 480">
                <router-link class="link" to="/stats/weight">
                    <img alt="Weight Icon" :src="require('@/../public/images/ui/sidebar/weight.webp')" />
                    <span>Weight</span>
                </router-link>
            </li>
            <li>
                <router-link class="link" to="Exercises">
                    <img alt="Exercises Icon" :src="require('@/../public/images/ui/sidebar/exercises.webp')" />
                    <span>Exercises</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      windowWidth: window.innerWidth
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  }
})
</script>

<style lang="scss">
nav {
    grid-row: 2 / 3;
    grid-column: 1 / -1;

    margin: 0 auto;
    padding: 10px 5px;
    width: 100%;

    background: rgb(20, 20, 20);

    ul {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: 1fr;

        font-family: var(--sidebar-font);
        font-size: 1rem;

        li {
            list-style-type: none;
            padding-right: 5px;

            a {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                gap: 5px;
                text-decoration: none;
                color: rgb(100, 100, 100);
                font-size: clamp(8px, 80%, 16px);

                img {
                    width: auto;
                    height: 30px;
                    filter: invert(0.25);
                }
            }

            .router-link-active {
                color: white;

                img {
                    filter: invert(1);
                }
            }
        }

        li:nth-child(5) {
            padding-right: 0;
        }
    }
}

@media (width > 480px) {
    nav {
        grid-row: 1 / -1;
        grid-column: 1 / 2;
        padding: 2vw;

        ul {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(6, 1fr);

            margin-top: 10vh;

            li {
                padding-right: 0;
                padding-bottom: 20px;
            }
        }
    }
}

@media (width > 1024px) {
    nav {
        grid-row: 1 / 2;
        grid-column: 1 / -1;
        height: 100%;
        padding: 0;

        ul {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: 1fr;
            margin-top: 0;
            height: 100%;

            li {
                padding: 0;
                height: 100%;

                a {
                    flex-direction: row;
                    justify-content: center;
                    gap: 10px;
                    padding: 20px 30px;

                    color: white;

                    img {
                        filter: invert(1);
                    }
                }

                a:hover {
                    background-color: rgb(40, 40, 40);
                }
            }
        }
    }
}
</style>
