<template>
<v-main
    class="bg-blue-lighten-4"
>
    <v-toolbar
        color="primary"
		extended
    >
        <v-toolbar-title
            class="flex align-center text-center"
        >
            <v-icon
                icon="mdi-account-search"
            ></v-icon>
            My Stats
        </v-toolbar-title>
        <template
            v-slot:extension
        >
            <v-tabs
                v-model="statStore.tab"
                bg-color="primary"
                class="w-100 bg-primary"
                align-tabs="center"
                fixed-tabs
                show-arrows
                centered
                :stacked="windowStore.width < 992"
            >
                <v-tab
                    value="weight"
                >
                    <v-icon
                        icon="mdi-scale-bathroom"
                    ></v-icon>
                    <span v-if="windowStore.width >= 600">Weight</span>
                </v-tab>
                <v-tab
                    value="measurement"
                >
                    <v-icon
                        icon="mdi-tape-measure"
                    ></v-icon>
                    <span v-if="windowStore.width >= 600">Measurements</span>
                </v-tab>
                <v-tab
                    value="record"
                >
                    <v-icon
                        icon="mdi-weight-lifter"
                    ></v-icon>
                    <span v-if="windowStore.width >= 600">Records</span>
                </v-tab>
            </v-tabs>
        </template>
    </v-toolbar>
    <StatsToolbar
        @weight="setPageShown('Weight')"
        @measure="setPageShown('Measurements')"
        @prs="setPageShown('PRs')"
    />
    <LoginBanner
        v-if="!token"
    />
    <v-window
        v-model="statStore.tab"
        class="d-flex justify-center align-center pa-5"
    >
        <v-window-item
            value="weight"
        >
            <WeightCard />
        </v-window-item>
        <v-window-item
            value="measurement"
        >
            <MeasurementCard />
        </v-window-item>
        <v-window-item
            value="record"
        >
            <PRCard />
        </v-window-item>
    </v-window>
    <StatsToolbar
        @weight="setPageShown('Weight')"
        @measure="setPageShown('Measurements')"
        @prs="setPageShown('PRs')"
    />
</v-main>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useStatStore } from '@/stores/statStore';
import { useWindowStore } from '@/stores/windowStore';
// Local components
import WeightCard from '@/components/cards/WeightCard.vue';
import MeasurementCard from '@/components/cards/MeasurementCard.vue';
import PRCard from '@/components/cards/PRCard.vue';
import LoginBanner from '@/components/banners/LoginBanner.vue';
import StatsToolbar from '@/components/toolbars/StatsToolbar.vue';
// Third-party libraries
import Cookies from 'js-cookie';

export default defineComponent({
	data () {
		const statPages = ['Weight', 'Measurements', 'PRs'];
		const pageShown = 'Measurements';

		return ({
			statPages,
			pageShown,
            statStore: useStatStore(),
            windowStore: useWindowStore(),
            token: Cookies.get('token')
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
		WeightCard,
		MeasurementCard,
		PRCard,
        LoginBanner,
        StatsToolbar
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
