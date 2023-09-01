<template>
<v-card
    :class="modeStore.darkMode ? 'bg-blue-grey-darken-3 mx-auto' : 'bg-blue-grey-lighten-3 mx-auto'"
    :width="300"
>
    <template
        v-slot:prepend
    >
        <v-icon
            icon="mdi-tape-measure"
            size="xx-large"
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
            :dark="modeStore.darkMode"
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
            :class="modeStore.darkMode ? 'bg-blue-grey-darken-4 text-white text-center mt-3' : 'bg-blue-grey-lighten-4 text-black text-center mt-3'"
        >
            <tbody>
                <tr>
                    <th class="flex text-center">DATE</th>
                    <th class="flex text-center">MEASUREMENT</th>
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
        <InfoAlert
            v-else
            title="No Measurements"
            text=""
            class="mt-3"
        />
    </v-card-text>
</v-card>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, ref } from 'vue';
// Pinia stores
import { useStatStore } from '@/stores/statStore';
import { useModeStore } from '@/stores/modeStore';
// Third-party components
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { MeasurementData } from '@/types/index';
// Local components
import InfoAlert from '../alerts/InfoAlert.vue';

export default defineComponent({
    data () {
        const statStore = useStatStore();
        const modeStore = useModeStore();
        const muscle = '';
        const items = ['Upper Arm', 'Forearm', 'Chest', 'Thigh', 'Calf', 'Waist', 'Shoulder'];
        const month = ref({
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        });

        return ({
            statStore,
            modeStore,
            muscle,
            items,
            month
        });
    },
    components: {
        VueDatePicker,
        InfoAlert
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
