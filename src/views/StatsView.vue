<template>
<main class="StatsView">
    <nav>
        <ul>
            <li v-for="page in statPages" :key="page">
                <button
                    :class="isPageShown(page) ? 'page-active' : 'page-inactive'"
                    @click="setPageShown(page)"
                >{{ page }}</button>
            </li>
        </ul>
        <hr/>
    </nav>
    <WeightLog v-if="pageShown === 'Weight'" />
    <MeasurementLog v-if="pageShown === 'Measurements'" />
    <PRLog v-if="pageShown === 'PRs'" />
    <AddButton
        :title="addButtonTitle"
        @click="statStore.toggleModal" />
    <footer>
        <ul>
            <li>Tape icon by Smashicons</li>
        </ul>
    </footer>
</main>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useStatStore } from '@/stores/statStore';
// Local components
import WeightLog from '@/components/ui/StatsView/WeightLog.vue';
import MeasurementLog from '@/components/ui/StatsView/MeasurementLog.vue';
import PRLog from '@/components/ui/StatsView/PRLog.vue';
import AddButton from '@/components/buttons/AddButton.vue';

export default defineComponent({
	data () {
		const statPages = ['Weight', 'Measurements', 'PRs'];
		const pageShown = 'Measurements';
        const statStore = useStatStore();

		return ({
			statPages,
			pageShown,
            statStore
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
		PRLog,
        AddButton
	},
    computed: {
        addButtonTitle () {
            switch (this.pageShown) {
                case 'Weight':
                    return 'Add New Weight';
                case 'Measurements':
                    return 'Add New Measurement';
                case 'PRs':
                    return 'Add New PR';
                default:
                    return '';
            }
        }
    },
	created () {
		this.pageShown = sessionStorage.getItem('statPageShown') || 'Measurements';
	}
})
</script>

<style lang="scss">
.StatsView {
    display: flex;
		flex-direction: column;
        gap: 20px;

    nav ul {
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
</style>
