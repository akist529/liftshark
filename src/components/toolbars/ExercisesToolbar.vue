<template>
<v-toolbar
    class="px-5 py-1"
    color="primary"
    density="compact"
    extended
    extension-height="auto"
>
    <v-toolbar-title
        class="flex align-center text-center"
    >
        <v-icon
            icon="mdi-dumbbell"
        ></v-icon>
        My Exercises
    </v-toolbar-title>
    <template v-slot:extension>
        <v-sheet
            v-if="windowStore.isDesktop"
            class="w-100 bg-primary d-flex flex-column justify-space-evenly align-center"
        >
            <label>Filter by Muscle</label>
            <v-chip-group
                v-if="muscles.isSuccess && muscles.data"
            >
                <v-chip
                    v-for="(muscle, index) in (muscles.data.results as Muscle[])"
                    :key="index"
                    label
                    filter
                    @click="filterMuscle(muscle)"
                >{{ muscle.name_en ? muscle.name_en : muscle.name }}</v-chip>
            </v-chip-group>
            <label>Filter by Equipment</label>
            <v-chip-group
                v-if="equipment.isSuccess && equipment.data"
            >
                <v-chip
                    v-for="(item, index) in (equipment.data.results as Equipment[])"
                    :key="index"
                    label
                    filter
                    @click="filterEquipment(item)"
                >{{ item.name }}</v-chip>
            </v-chip-group>
        </v-sheet>
        <v-sheet
            v-if="!windowStore.isDesktop"
            class="bg-primary d-flex flex-column justify-center align-center w-100"
        >
            <v-select
                v-if="muscles.isSuccess && muscles.data"
                v-model="exerciseStore.filteredMuscle"
                label="Filter by Muscle"
                :items="muscles.data.results"
                item-title="name"
                return-object
                class="w-75"
            ></v-select>
            <v-select
                v-if="equipment.isSuccess && equipment.data"
                v-model="exerciseStore.filteredEquipment"
                label="Filter by Equipment"
                :items="equipment.data.results"
                item-title="name"
                return-object
                class="w-75"
            ></v-select>
        </v-sheet>
    </template>
</v-toolbar>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useWindowStore } from '@/stores/windowStore';
import { useExerciseStore } from '@/stores/exerciseStore';
// Type interfaces
import { Muscle, Equipment } from '@/types/index';

export default defineComponent({
    data () {
        return ({
            windowStore: useWindowStore(),
            exerciseStore: useExerciseStore()
        });
    },
    props: ['muscles', 'equipment'],
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
		}
	}
})
</script>

<style scoped lang="scss">

</style>
