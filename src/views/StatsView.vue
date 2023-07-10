<template>
<div class="my-stats">
    <h1>My Statistics</h1>
    <nav>
        <ul>
            <li v-for="page in statPages" :key="page">
                <button
                    @click="setPageShown(page)"
                    :class="isPageShown(page) ? 'page-active' : 'page-inactive'"
                >{{ page }}</button>
            </li>
        </ul>
        <hr/>
    </nav>
    <WeightLog v-if="pageShown === 'Weight'" />
    <MeasurementLog v-if="pageShown === 'Measurements'" />
    <PRLog v-if="pageShown === 'PRs'" />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// Local components
import WeightLog from '@/components/WeightLog.vue';
import MeasurementLog from '@/components/MeasurementLog.vue';
import PRLog from '@/components/PRLog.vue';

export default defineComponent({
	data () {
		const statPages = ['Weight', 'Measurements', 'PRs'];
		const pageShown = 'Measurements';

		return ({
			statPages,
			pageShown
		});
	},
	methods: {
		setPageShown (page: string) {
			sessionStorage.setItem('statPageShown', page);
			this.pageShown = page;
		},
		isPageShown (page: string) {
			if (page === this.pageShown) return true;
				else return false;
		}
	},
	components: {
		WeightLog,
		MeasurementLog,
		PRLog
	},
	created () {
		this.pageShown = sessionStorage.getItem('statPageShown') || 'Measurements';
	}
})
</script>

<style lang="scss">
.my-stats {
    display: flex;
		flex-direction: column;

    nav {
        ul {
			/* Positioning */
            display: grid;
				grid-template-columns: repeat(3, 1fr);
				justify-items: center;
				align-items: center;
			width: 300px;
            position: relative;

			/* Visual */
            list-style-type: none;
            font-size: 16px;
            background: rgb(215, 215, 215);
            border: 3px solid rgb(175, 175, 175);

            li {
                position: relative;
                width: 100%;

                button {
					/* Positioning */
                    position: relative;
                    width: 100%;

					/* Visual */
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 5px;
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
