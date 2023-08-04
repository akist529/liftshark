<template>
<v-container class="StatsView">
    <ul>
        <li>
            <v-btn
                @click="setPageShown('Weight')"
                prepend-icon="mdi-scale-bathroom"
                variant="flat"
                :class="(pageShown === 'Weight') ? 'bg-blue-lighten-3' : 'bg-grey-lighten-2'"
                :stacked="windowStore.width < 600"
            >Weight</v-btn>
        </li>
        <li>
            <v-btn
                @click="setPageShown('Measurements')"
                prepend-icon="mdi-tape-measure"
                variant="flat"
                :class="(pageShown === 'Measurements') ? 'bg-blue-lighten-3' : 'bg-grey-lighten-2'"
                :stacked="windowStore.width < 600"
            >Measurements</v-btn>
        </li>
        <li>
            <v-btn
                @click="setPageShown('PRs')"
                prepend-icon="mdi-weight-lifter"
                variant="flat"
                :class="(pageShown === 'PRs') ? 'bg-blue-lighten-3' : 'bg-grey-lighten-2'"
                :stacked="windowStore.width < 600"
            >PRs</v-btn>
        </li>
    </ul>
    <hr/>
    <WeightLog v-if="pageShown === 'Weight'" />
    <MeasurementLog v-if="pageShown === 'Measurements'" />
    <PRLog v-if="pageShown === 'PRs'" />
    <StatsModal
        :stat="pageShown"
        @weight="setPageShown('Weight')"
        @measure="setPageShown('Measurements')"
        @prs="setPageShown('PRs')" />
    <footer>
        <ul>
            <li>Tape icon by Smashicons</li>
        </ul>
    </footer>
</v-container>
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
            windowStore
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
