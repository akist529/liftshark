<template>
<nav class="NavBar">
    <ModeButton v-if="windowWidth >= 600 && windowWidth < 992" />
    <ul>
        <li v-if="windowWidth >= 992">
            <ModeButton />
        </li>
        <li>
            <router-link class="link" to="/">
                <v-icon
                    icon="mdi-home"
                    size="xx-large"
                    color="grey"
                ></v-icon>
                <span>Home</span>
            </router-link>
        </li>
        <li>
            <router-link class="link" to="/workouts">
                <v-icon
                    icon="mdi-weight-lifter"
                    size="xx-large"
                    color="grey"
                ></v-icon>
                <span>Workouts</span>
            </router-link>
        </li>
        <li>
            <router-link class="link" to="/routines">
                <v-icon
                    icon="mdi-notebook"
                    size="xx-large"
                    color="grey"
                ></v-icon>
                <span>Routines</span>
            </router-link>
        </li>
        <li>
            <router-link class="link" to="/stats">
                <v-icon
                    icon="mdi-account-search"
                    size="xx-large"
                    color="grey"
                ></v-icon>
                <span>Stats</span>
            </router-link>
        </li>
        <li>
            <router-link class="link" to="/exercises">
                <v-icon
                    icon="mdi-dumbbell"
                    size="xx-large"
                    color="grey"
                ></v-icon>
                <span>Exercises</span>
            </router-link>
        </li>
    </ul>
</nav>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Local components
import ModeButton from './buttons/ModeButton.vue';

export default defineComponent({
	data () {
		return ({
			windowWidth: window.innerWidth
		});
	},
    components: {
        ModeButton
    },
	mounted () {
		window.addEventListener('resize', () => {
			this.windowWidth = window.innerWidth;
		});
	}
});
</script>

<style scoped lang="scss">
.NavBar {
	/* Positioning */
	position: relative;
		z-index: 1;
    grid-row: 3 / 4;
    grid-column: 1 / -1;
    margin: 0 auto;
	width: 100%;

	/* Visual */
    padding: 10px 5px;
    background: rgb(20, 20, 20);

    ul {
		/* Positioning */
        display: grid;
			grid-template-columns: repeat(5, 1fr);
			grid-template-rows: 1fr;

		/* Visual */
        font-family: var(--title-font);
			font-size: 1rem;

        li {
            list-style-type: none;

            a {
				/* Positioning */
                display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					gap: 5px;

				/* Visual */
                text-decoration: none;
                color: rgb(100, 100, 100);
                font-size: clamp(8px, 80%, 16px);

                img {
                    width: auto;
                    height: 30px;
                    filter: invert(0.25);
                }

                .icon {
                    display: inline-block;
                    content: '';
                    width: 30px;
                    height: 30px;
                    background-repeat: no-repeat;
                        background-size: contain;
                        background-position: center;
                    filter: invert(0.25);
                }
            }

            .router-link-active {
                color: white;

                img {
                    filter: invert(1);
                }

                .icon {
                    filter: invert(1);
                }
            }
        }
    }
}

@media (width >= 600px) {
    .NavBar {
        grid-row: 1 / -1;
        grid-column: 1 / 2;
        padding: 2vw;

        ul {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(5, 1fr);
            margin-top: 10vh;

            li {
                padding-right: 0;
                padding-bottom: 20px;
            }
        }
    }
}

@media (width >= 992px) {
    .NavBar {
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
                display: flex;
                justify-content: center;
                align-items: center;

                a {
                    flex-direction: row;
						justify-content: center;
						gap: 10px;
                    padding: 20px 30px;
                    color: white;
                    width: 100%;

                    img {
                        filter: invert(1);
                    }
                }

                a:hover {
                    background-color: rgb(40, 40, 40);
                }

                .router-link-active {
                    background-color: rgb(40, 40, 40);
                }
            }
        }
    }
}
</style>
