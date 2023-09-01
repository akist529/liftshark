<template>
<v-dialog
    scrollable
	persistent
	v-model="dialog"
	class="w-100 h-100"
	:max-width="windowStore.width >= 600 ? '400px' : '100%'"
>
    <template
		v-slot:activator="{ props: dialog }"
	>
		<v-tooltip
			text="Add New Record"
			:open-delay="125"
		>
			<template
				v-slot:activator="{ props: tooltip }"
			>
				<v-btn
					v-bind="mergeProps(dialog, tooltip)"
				>
					<v-icon
						icon="mdi-medal"
						size="xx-large"
					></v-icon>
				</v-btn>
			</template>
		</v-tooltip>
	</template>
	<v-card
		:class="modeStore.darkMode ? 'bg-blue-grey-darken-3 d-flex justify-center align-center pa-2 rounded-lg' : 'bg-blue-grey-lighten-3 d-flex justify-center align-center pa-2 rounded-lg'"
	>
		<v-card-title class="d-flex justify-center align-center w-100">
			<v-icon
				icon="mdi-medal"
				class="mr-1"
			></v-icon>
			Log 1-Rep Max
		</v-card-title>
		<v-card-actions
			class="d-flex flex-wrap justify-center align-center w-100"
			:style="{gap: '10px'}"
		>
			<VueDatePicker
				class="d-flex justify-center align-center"
				:dark="modeStore.darkMode ? true : false"
				v-model="statStore.date"
				ref="datepicker"
				:teleport="true"
				:enable-time-picker="false"
				@update:model-value="handleDate"
			/>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
		<v-card-actions
            class="d-flex flex-column justify-center align-center w-100"
        >
            <v-select
                class="w-100"
                :value="exerciseStore.exercise.name"
                append-icon="mdi-dumbbell"
                readonly
            ></v-select>
            <v-text-field
                v-model="record"
                hide-details="auto"
                density="compact"
                type="number"
                label="1-Rep Max (lbs)"
                class="w-100"
                append-icon="mdi-medal"
            ></v-text-field>
		</v-card-actions>
		<v-card-actions>
			<v-btn
				@click="addRecord"
				variant="flat"
				color="success"
				prepend-icon="mdi-plus"
			>Add</v-btn>
			<v-btn
				@click="dialog = false"
				variant="flat"
				color="error"
				prepend-icon="mdi-close"
			>Close</v-btn>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, mergeProps } from 'vue';
// Pinia stores
import { useWindowStore } from '../../../stores/windowStore';
import { useModeStore } from '@/stores/modeStore';
import { useStatStore } from '@/stores/statStore';
import { useExerciseStore } from '@/stores/exerciseStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
// Third-party components
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
// Local components
import CloseButton from '@/components/buttons/CloseButton.vue';

export default defineComponent({
    data () {
        return ({
            windowStore: useWindowStore(),
            modeStore: useModeStore(),
            statStore: useStatStore(),
            exerciseStore: useExerciseStore(),
            snackbarStore: useSnackbarStore(),
            dialog: false,
            record: 0
        });
    },
    components: {
        VueDatePicker,
		CloseButton
    },
    methods: {
        addRecord () {
			const recordExists = this.statStore.records.find(record => {
				if (record.attributes.date === this.statStore.date.toLocaleDateString('en-CA').split('T')[0] &&
				record.attributes.exercise === this.exerciseStore.exercise.exercise_base) {
					return true;
				} else return false;
			});

			if (recordExists) this.statStore.deleteRecord(recordExists.id);

			this.statStore.addRecord(this.exerciseStore.exercise.exercise_base, this.record);
			this.dialog = false;
			this.snackbarStore.text = 'Record successfully added';
			this.snackbarStore.color = 'success';
			this.snackbarStore.icon = 'mdi-check';
			this.snackbarStore.open = true;
		},
        handleDate (modelData) {
			this.statStore.date = modelData;
			this.statStore.dateVal = this.statStore.date.getDate();
			this.statStore.dateString = modelData.toLocaleDateString('en-CA').split('T')[0];
		},
        mergeProps
    }
});
</script>
