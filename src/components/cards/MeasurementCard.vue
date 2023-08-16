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
    <v-card-actions
        class="d-flex flex-column justify-center align-center"
    >
        <VueDatePicker
            v-model="month"
            month-picker
            :teleport="true"
            teleport-center
        />
        <v-select
            v-model="muscle"
            label="Muscle"
            :placeholder="items[0]"
            :items="items"
            class="w-100 pt-3"
        ></v-select>
    </v-card-actions>
    <v-card-text>
        <v-table
            v-if="measurements.length"
        >
            <tbody>
                <tr>
                    <th>DATE</th>
                    <th>MEASUREMENT</th>
                </tr>
                <tr
                    v-for="measurement in measurements"
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
import { defineComponent, ref } from 'vue';
// Pinia stores
import { useStatStore } from '@/stores/statStore';
// Third-party components
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { MeasurementData } from '@/types/index';

export default defineComponent({
    data () {
        const statStore = useStatStore();
        const muscle = '';
        const items = ['Upper Arm', 'Forearm', 'Chest', 'Thigh', 'Calf', 'Waist', 'Shoulder'];
        const month = ref({
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        });

        return ({
            statStore,
            muscle,
            items,
            month
        });
    },
    components: {
        VueDatePicker
    },
    computed: {
        measurements (): MeasurementData[] {
            return this.statStore.measurements.filter(measurement => {
                const year = Number(measurement.attributes.date.slice(0, 4));
                const month = Number(measurement.attributes.date.slice(5, 7)) - 1;

                if (measurement.attributes.muscle === this.muscle && year === this.month.year && month === this.month.month) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    }
});
</script>
