<template>
<v-card class="MeasurementLog">
    <v-card-title>
        <h1>Measurement Log</h1>
    </v-card-title>
    <v-card-actions>
        <v-select
            v-model="muscle"
            label="Muscle"
            :items="['Upper Arm', 'Forearm', 'Chest', 'Thigh', 'Calf', 'Waist', 'Shoulder']"
        ></v-select>
    </v-card-actions>
    <v-card-text>
        <v-table v-if="filteredMeasurements.length">
            <tbody>
                <tr>
                    <th>DATE</th>
                    <th>MEASUREMENT</th>
                </tr>
                <tr v-for="measurement in filteredMeasurements" :key="measurement.id">
                    <td>{{ measurement.attributes.date }}</td>
                    <td>{{ `${measurement.attributes.measurement}"` }}</td>
                </tr>
            </tbody>
        </v-table>
        <strong v-else>No measurements logged.</strong>
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

        return ({
            statStore,
            muscle
        });
    },
    computed: {
        filteredMeasurements () {
            return this.statStore.measurements.filter(measurement => measurement.attributes.muscle === this.muscle);
        }
    }
});
</script>

<style scoped lang="scss">
.MeasurementLog {
    h1 {
        display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;

        &::after {
            display: inline-block;
            content: '';
            width: 48px;
            height: 48px;
            background-image: url('/public/images/icons/tape.webp');
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
        }
    }
}
</style>
