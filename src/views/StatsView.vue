<template>
<main class="StatsView">
    <v-tabs v-model="tab" bg-color="primary">
        <v-tab
            value="weight"
            prepend-icon="mdi-scale-bathroom"
            :stacked="windowStore.width < 600"
        >Weight</v-tab>
        <v-tab
            value="measurement"
            prepend-icon="mdi-tape-measure"
            :stacked="windowStore.width < 600"
        >Measurements</v-tab>
        <v-tab
            value="record"
            prepend-icon="mdi-weight-lifter"
            :stacked="windowStore.width < 600"
        >PRs</v-tab>
    </v-tabs>
    <v-window v-model="tab">
        <v-window-item value="weight">
            <WeightLog />
        </v-window-item>
        <v-window-item value="measurement">
            <MeasurementLog />
        </v-window-item>
        <v-window-item value="record">
            <PRLog />
        </v-window-item>
    </v-window>
    <StatsModal
        :stat="pageShown"
        @weight="setPageShown('Weight')"
        @measure="setPageShown('Measurements')"
        @prs="setPageShown('PRs')" />
    <footer>Tape icon by Smashicons</footer>
</main>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useStatStore } from '@/stores/statStore';
import { useWindowStore } from '@/stores/windowStore';
// Local components
import WeightLog from '@/components/ui/StatsView/WeightLog.vue';
import MeasurementLog from '@/components/ui/StatsView/MeasurementLog.vue';
import PRLog from '@/components/ui/StatsView/PRLog.vue';
import StatsModal from '@/components/modals/StatsModal.vue';

export default defineComponent({
	data () {
		const statPages = ['Weight', 'Measurements', 'PRs'];
		const pageShown = 'Measurements';
        const statStore = useStatStore();
        const windowStore = useWindowStore();

		return ({
			statPages,
			pageShown,
            statStore,
            windowStore,
            tab: null
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
        StatsModal
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
    ul {
        /* Positioning */
        display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 10px;

        /* Visual */
        list-style-type: none;
    }
}
</style>
