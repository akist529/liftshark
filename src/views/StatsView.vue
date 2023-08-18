<template>
<v-main
    class="bg-blue-lighten-4"
>
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
    <MyFooter />
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
import MyFooter from '@/components/MyFooter.vue';
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
        StatsToolbar,
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
