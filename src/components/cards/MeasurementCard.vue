<template>
<v-card
    class="mx-auto"
    width="400"
>
    <template
        v-slot:prepend
    >
        <v-icon
            icon="mdi-tape-measure"
            size="xx-large"
            color="primary"
        ></v-icon>
    </template>
    <template
        v-slot:title
    >Measurement Log</template>
    <v-card-actions>
        <v-select
            v-model="muscle"
            label="Muscle"
            :placeholder="items[0]"
            :items="items"
        ></v-select>
    </v-card-actions>
    <v-card-text>
        <v-table
            v-if="filteredMeasurements().length"
        >
            <tbody>
                <tr>
                    <th>DATE</th>
                    <th>MEASUREMENT</th>
                </tr>
                <tr
                    v-for="measurement in filteredMeasurements()"
                    :key="measurement.id"
                >
                    <td>{{ measurement.attributes.date }}</td>
                    <td>{{ `${measurement.attributes.measurement}"` }}</td>
                </tr>
            </tbody>
        </v-table>
        <strong
            v-else
        >No measurements logged.</strong>
    </v-card-text>
</v-card>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useStatStore } from '@/stores/statStore';

export default defineComponent({
    data () {
        const statStore = useStatStore();
        const muscle = '';
        const items = ['Upper Arm', 'Forearm', 'Chest', 'Thigh', 'Calf', 'Waist', 'Shoulder'];

        return ({
            statStore,
            muscle,
            items
        });
    },
    methods: {
        filteredMeasurements () {
            const muscle = this.muscle;
            return this.statStore.measurements.filter(measurement => measurement.attributes.muscle === muscle);
        }
    }
});
</script>
