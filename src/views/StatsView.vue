<template>
<section
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
            >
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
        </template>
    </v-toolbar>
    <LoginBanner
        v-if="!token"
    />
    <v-window
        v-model="statStore.tab"
        class="d-flex justify-center align-center w-100 pa-5"
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
    <StatsModal
        @weight="setPageShown('Weight')"
        @measure="setPageShown('Measurements')"
        @prs="setPageShown('PRs')" />
    <MyFooter />
</section>
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
import StatsModal from '@/components/modals/StatsModal.vue';
import LoginBanner from '@/components/banners/LoginBanner.vue';
import MyFooter from '@/components/MyFooter.vue';
// Third-party libraries
import Cookies from 'js-cookie';

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
        StatsModal,
        LoginBanner,
        MyFooter
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
