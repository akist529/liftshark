<template>
<v-dialog
    scrollable
    persistent
    v-model="dialog"
    class="RecordModal w-100 h-100"
    :max-width="windowStore.width >= 600 ? '400px' : '100%'"
>
	<template
        v-slot:activator="{ props }"
    >
        <v-btn
            title="Add New Record"
            v-bind="props"
        >
            <v-icon
                icon="mdi-dumbbell"
                size="xx-large"
            ></v-icon>
        </v-btn>
	</template>
	<v-card class="d-flex justify-center align-center pa-2 rounded-lg bg-blue-grey-lighten-3 text-black">
		<v-card-title class="d-flex justify-center align-center w-100">
			<h1>Log Statistic</h1>
		</v-card-title>
		<v-card-actions class="d-flex flex-wrap justify-center align-center w-100" :style="{gap: '10px'}">
			<v-tabs v-model="statStore.tab" bg-color="primary">
				<v-tab
					value="weight"
					prepend-icon="mdi-scale-bathroom"
					:stacked="windowStore.width < 600"
					@click="$emit('weight')"
				>Weight</v-tab>
				<v-tab
					value="measurement"
					prepend-icon="mdi-tape-measure"
					:stacked="windowStore.width < 600"
					@click="$emit('measure')"
				>Measurements</v-tab>
				<v-tab
					value="record"
					prepend-icon="mdi-weight-lifter"
					:stacked="windowStore.width < 600"
					@click="$emit('prs')"
				>PRs</v-tab>
			</v-tabs>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
		<v-card-text v-if="isSuccess && data" class="d-flex justify-center align-center w-100">
			<v-window v-model="statStore.tab">
				<v-window-item value="weight">
					<v-form class="w-75">
						<v-text-field
							v-model="weight"
							hide-details="auto"
							density="compact"
							type="number"
							label="Weight (lbs)"
							append-icon="mdi-weight-pound"
						></v-text-field>
					</v-form>
				</v-window-item>
				<v-window-item value="measurement">
					<v-form class="w-75">
						<v-select
							v-model="muscle"
							label="Muscle"
							:items="['Upper Arm', 'Forearm', 'Chest', 'Thigh', 'Calf', 'Waist', 'Shoulder']"
							append-icon="mdi-arm-flex"
						></v-select>
						<v-text-field
							v-model="measurement"
							hide-details="auto"
							density="compact"
							type="number"
							label="Measurement (in)"
							class="w-100"
							append-icon="mdi-tape-measure"
							:min="1"
						></v-text-field>
					</v-form>
				</v-window-item>
				<v-window-item value="record">
					<v-form class="w-75">
						<v-select
							v-model="exercise"
							label="Exercise"
							:placeholder="data.results[0].name"
							:items="data.results.map(exercise => exercise.name)"
							append-icon="mdi-dumbbell"
						></v-select>
						<v-text-field
							v-model="record"
							hide-details="auto"
							density="compact"
							type="number"
							label="New Record (lbs)"
							class="w-100"
							append-icon="mdi-medal"
						></v-text-field>
					</v-form>
				</v-window-item>
			</v-window>
		</v-card-text>
		<v-card-actions>
			<v-btn
				@click="addStat"
				variant="flat"
				color="success"
			>Add</v-btn>
			<v-btn
				@click="dialog = false"
				variant="flat"
				color="error"
			>Close</v-btn>
		</v-card-actions>
	</v-card>
</v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        

        return {}
    }
})
</script>

<style scoped>

</style>