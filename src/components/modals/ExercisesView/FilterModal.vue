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
            text="Filter Exercises"
            :open-delay="125"
        >
            <template
                v-slot:activator="{ props: tooltip }"
            >
                <v-btn
                    v-bind="mergeProps(dialog, tooltip)"
                >
                    <v-icon
                        icon="mdi-filter"
                        size="xx-large"
                    ></v-icon>
                </v-btn>
            </template>
        </v-tooltip>
	</template>
	<v-card
        class="d-flex justify-center align-center pa-2 rounded-lg bg-blue-grey-lighten-3 text-black"
    >
		<v-card-title
            class="d-flex justify-center align-center w-100"
        >
            <v-icon
                icon="mdi-dumbbell"
                class="mr-2"
            ></v-icon>
			Filter Exercises
		</v-card-title>
        <v-card-actions>
            <v-tabs v-model="mode" class="bg-primary">
                <v-tab value="muscle">
                    <v-icon
                        icon="mdi-arm-flex"
                        size="xx-large"
                    ></v-icon>
                </v-tab>
                <v-tab value="equipment">
                    <v-icon
                        icon="mdi-bench"
                        size="xx-large"
                    ></v-icon>
                </v-tab>
            </v-tabs>
        </v-card-actions>
		<v-card-actions
            class="d-flex flex-wrap justify-center align-center w-100"
            :style="{gap: '10px'}"
        >
            <v-window v-model="mode">
                <v-window-item
                    value="muscle"
                    class="flex text-center"
                >
                    <label>Filter by Muscle</label>
                    <v-chip-group
                        v-if="muscles.isSuccess && muscles.data"
                        class="d-flex justify-center align-center"
                    >
                        <v-chip
                            v-for="(muscle, index) in (muscles.data.results as Muscle[])"
                            :key="index"
                            label
                            filter
                            @click="filterMuscle(muscle)"
                        >{{ muscle.name_en ? muscle.name_en : muscle.name }}</v-chip>
                    </v-chip-group>
                </v-window-item>
                <v-window-item
                    value="equipment"
                    class="flex text-center"
                >
                    <label>Filter by Equipment</label>
                    <v-chip-group
                        v-if="equipment.isSuccess && equipment.data"
                        class="d-flex justify-center align-center"
                    >
                        <v-chip
                            v-for="(item, index) in (equipment.data.results as Equipment[])"
                            :key="index"
                            label
                            filter
                            @click="filterEquipment(item)"
                        >{{ item.name }}</v-chip>
                    </v-chip-group>
                </v-window-item>
            </v-window>
			<CloseButton
				@click="dialog = false" />
		</v-card-actions>
		<v-card-actions>
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
import { useExerciseStore } from '@/stores/exerciseStore';
// Local components
import CloseButton from '../../../components/buttons/CloseButton.vue';
// Type interfaces
import { Muscle, Equipment } from '../../../types/index';

export default defineComponent({
    data () {
        return ({
            windowStore: useWindowStore(),
            exerciseStore: useExerciseStore(),
            dialog: false,
            mode: 'muscle'
        });
    },
    props: ['muscles', 'equipment'],
    components: {
        CloseButton
    },
    methods: {
		filterMuscle (muscle: Muscle) {
			if (this.exerciseStore.filteredMuscle?.id === muscle.id) {
				this.exerciseStore.filteredMuscle = null;
			} else {
				this.exerciseStore.filteredMuscle = muscle;
			}
		},
		filterEquipment (item: Equipment) {
			if (this.exerciseStore.filteredEquipment?.id === item.id) {
				this.exerciseStore.filteredEquipment = null;
			} else {
				this.exerciseStore.filteredEquipment = item;
			}
		},
        mergeProps
	}
});
</script>
