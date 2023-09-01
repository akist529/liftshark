<template>
<v-main
    :class="modeStore.darkMode ? 'bg-grey-darken-4' : 'bg-blue-lighten-4'"
>
    <v-container
        fluid
		class="fill-height pa-0"
    >
        <v-row
            no-gutters
			class="ma-0 align-self-start w-100"
        >
            <v-col :cols="12">
                <StatsToolbar
                    @weight="setPageShown('Weight')"
                    @measure="setPageShown('Measurements')"
                    @prs="setPageShown('PRs')"
                />
                <LoginBanner
                    v-if="!loginStore.token"
                />
            </v-col>
        </v-row>
        <v-row
            no-gutters
			class="content w-100 ma-0 align-self-stretch"
        >
            <v-col :cols="12">
                <v-window
                    class="h-100 d-flex justify-center align-center"
                    v-model="statStore.tab"
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
            </v-col>
        </v-row>
        <v-row
            no-gutters
			class="ma-0 align-self-end"
        >
            <v-col :cols="12">
                <MyFooter />
            </v-col>
        </v-row>
    </v-container>
</v-main>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useStatStore } from '@/stores/statStore';
import { useWindowStore } from '@/stores/windowStore';
import { useLoginStore } from '@/stores/loginStore';
import { useModeStore } from '@/stores/modeStore';
// Local components
import WeightCard from '@/components/cards/WeightCard.vue';
import MeasurementCard from '@/components/cards/MeasurementCard.vue';
import PRCard from '@/components/cards/PRCard.vue';
import LoginBanner from '@/components/banners/LoginBanner.vue';
import StatsToolbar from '@/components/toolbars/StatsToolbar.vue';
import MyFooter from '@/components/MyFooter.vue';

export default defineComponent({
	data () {
		const statPages = ['Weight', 'Measurements', 'PRs'];
		const pageShown = 'Measurements';

		return ({
			statPages,
			pageShown,
            statStore: useStatStore(),
            windowStore: useWindowStore(),
            loginStore: useLoginStore(),
            modeStore: useModeStore()
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

<style scoped>
.content {
	background-image: url('/public/images/ui/shark-bg.webp');
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: scroll;
}

@media only screen and (min-width: 600px) {
	.content {
		background-size: contain;
	}
}
</style>
