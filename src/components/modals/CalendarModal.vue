<template>
<v-dialog scrollable persistent v-model="dialog" class="CalendarModal w-100 h-100" :max-width="windowStore.width >= 600 ? '400px' : '100%'">
	<template v-slot:activator="{ props }">
		<v-btn
			v-bind="props"
			:prepend-icon="dateIsToday ? 'mdi-calendar-today' : 'mdi-calendar'"
			class="bg-blue-lighten-4"
			variant="tonal"
			title="Change Date">
			<span v-if="dateIsToday">Today</span>
			<div v-else>
				<span>{{ workoutStore.months[workoutStore.date.getMonth()] }}</span>
				<hr/>
				<span>{{ workoutStore.dateVal }}</span>
			</div>
		</v-btn>
	</template>
	<v-card>
		<v-card-actions>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
		<v-card-text class="pa-3">
			<VueDatePicker
				class="d-flex justify-center align-center"
				v-model="workoutStore.date"
				ref="datepicker"
				:enable-time-picker="false"
				@update:model-value="handleDate"
				inline />
		</v-card-text>
	</v-card>
</v-dialog>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useWindowStore } from '@/stores/windowStore';
// Local components
import CloseButton from '@/components/buttons/CloseButton.vue';
// Third-party components
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default defineComponent({
	data () {
		const workoutStore = useWorkoutStore();
		const windowStore = useWindowStore();

		return ({
			workoutStore,
			windowStore,
			dialog: false
		});
	},
	components: {
		CloseButton,
		VueDatePicker
	},
	computed: {
        dateIsToday () {
			const date = new Date();

            if (date.getFullYear() === this.workoutStore.date.getFullYear() &&
				date.getMonth() === this.workoutStore.date.getMonth() &&
				date.getDate() === this.workoutStore.dateVal) {
				return true;
			} else {
				return false;
			}
        }
    },
	methods: {
		handleDate (modelData) {
			this.workoutStore.date = modelData;
			this.workoutStore.dateVal = this.workoutStore.date.getDate();
			this.workoutStore.dateString = modelData.toLocaleDateString('en-CA').split('T')[0];
			this.dialog = false;
		}
	}
});
</script>
