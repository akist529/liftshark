<template>
<v-dialog
	scrollable
	persistent
	v-model="dialog"
	:max-width="windowStore.width >= 600 ? '400px' : '100%'"
>
	<template
		v-slot:activator="{ props: dialog }"
	>
		<v-tooltip
			text="Change Date"
			:open-delay="500"
		>
			<template
				v-slot:activator="{ props: tooltip }"
			>
				<v-btn
					v-bind="mergeProps(dialog, tooltip)"
					:prepend-icon="dateIsToday ? 'mdi-calendar-today' : 'mdi-calendar'"
					variant="plain">
					<span v-if="dateIsToday">Today</span>
					<div v-else>
						<span>{{ workoutStore.months[workoutStore.date.getMonth()] }}</span>
						<hr/>
						<span>{{ workoutStore.dateVal }}</span>
					</div>
				</v-btn>
			</template>
		</v-tooltip>
	</template>
	<v-card
		:class="modeStore.darkMode ? 'bg-blue-grey-darken-3' : 'bg-blue-grey-lighten-3'"
	>
		<v-card-actions>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
		<v-card-text class="pa-3">
			<VueDatePicker
				class="d-flex justify-center align-center"
				:dark="modeStore.darkMode ? true : false"
				v-model="workoutStore.date"
				ref="datepicker"
				:enable-time-picker="false"
				@update:model-value="handleDate"
				inline
			/>
		</v-card-text>
	</v-card>
</v-dialog>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, mergeProps } from 'vue';
// Pinia stores
import { useWorkoutStore } from '@/stores/workoutStore';
import { useWindowStore } from '@/stores/windowStore';
import { useModeStore } from '@/stores/modeStore';
// Local components
import CloseButton from '@/components/buttons/CloseButton.vue';
// Third-party components
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default defineComponent({
	data () {
		const workoutStore = useWorkoutStore();
		const windowStore = useWindowStore();
		const modeStore = useModeStore();

		return ({
			workoutStore,
			windowStore,
			modeStore,
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
		},
		mergeProps
	}
});
</script>
