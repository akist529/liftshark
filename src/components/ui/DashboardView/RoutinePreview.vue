<template>
<v-card v-if="routine">
    <v-card-title>{{ routine.attributes.name }}</v-card-title>
    <v-card-text>
        <v-list v-if="routine.attributes.entries">
            <v-list-item
                v-for="entry in routine.attributes.entries"
                :key="entry.key"
            >
                <v-card>
                    <v-card-title>{{ entry.name }}</v-card-title>
                    <v-card-text v-if="entry.sets">
                        <v-list>
                            <v-list-item
                                v-for="set in entry.sets"
                                :key="set.key"
                            >
                                <span>{{ set.reps }} reps</span>
                                <span>{{ set.weight }} lbs.</span>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-list-item>
        </v-list>
    </v-card-text>
</v-card>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Type interfaces
import { RoutineData } from '@/types/index';

export default defineComponent({
    props: {
        routine: {
            type: Object as PropType<RoutineData>,
            required: true
        }
    }
});
</script>
