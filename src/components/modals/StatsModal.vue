<template>
<v-dialog scrollable persistent v-model="dialog" class="StatsModal w-100 h-100" max-width="400px">
	<template v-slot:activator="{ props }">
		<AddButton
			v-bind="props"
			title="Add New Statistic"
			:style="{position: 'absolute', bottom: 30 + 'px', right: 30 + 'px'}" />
	</template>
	<v-card class="d-flex justify-center align-center pa-2 rounded-lg bg-blue-grey-lighten-3 text-black">
		<v-card-title class="d-flex flex-column justify-center align-center w-75">
			<h1>Stat</h1>
		</v-card-title>
		<v-card-actions>
			<v-btn
				prepend-icon="mdi-scale-bathroom"
			>Weight</v-btn>
			<v-btn
				prepend-icon="mdi-tape-measure"
			>Measurements</v-btn>
			<v-btn
				prepend-icon="mdi-weight-lifter"
			>PRs</v-btn>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
	</v-card>
</v-dialog>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useStatStore } from '@/stores/statStore';
// Local components
import CloseButton from '../buttons/CloseButton.vue';
import AddButton from '../buttons/AddButton.vue';

export default defineComponent({
    data () {
        const statStore = useStatStore();

        return ({
            statStore,
			dialog: false
        });
    },
    components: {
        CloseButton,
		AddButton
    }
})
</script>

<style scoped lang="scss">
.StatsModal {
	/* Visual */
	font-family: 'Karla';
	text-transform: uppercase;
}
</style>
