<template>
<v-card
    :class="modeStore.darkMode ? 'bg-blue-grey-darken-3 mx-auto' : 'bg-blue-grey-lighten-3 mx-auto'"
    :width="300"
>
    <template
        v-slot:prepend
    >
        <v-icon
            icon="mdi-scale-bathroom"
            size="xx-large"
        ></v-icon>
    </template>
    <template
        v-slot:title
    >
        Weight Log
    </template>
    <v-card-text>
        <VueDatePicker
            v-model="month"
            month-picker
            :teleport="true"
            teleport-center
            :dark="modeStore.darkMode"
        />
        <v-table
            v-if="weights.length"
            :class="modeStore.darkMode ? 'bg-blue-grey-darken-4 text-white text-center mt-3' : 'bg-blue-grey-lighten-4 text-black text-center mt-3'"
        >
            <tbody>
                <tr>
                    <th
                        class="text-center"
                    >DATE</th>
                    <th
                        class="text-center"
                    >WEIGHT</th>
                </tr>
                <tr
                    v-for="weight in weights"
                    :key="weight.id"
                >
                    <td>{{ weight.attributes.date }}</td>
                    <td>{{ weight.attributes.measurement }}</td>
                </tr>
            </tbody>
        </v-table>
        <InfoAlert
            v-else
            title="No Weights"
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
// Type interfaces
import { WeightData } from '@/types';
// Local components
import InfoAlert from '../alerts/InfoAlert.vue';

export default defineComponent({
    data () {
        const month = ref({
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        });

        return ({
            statStore: useStatStore(),
            modeStore: useModeStore(),
            month
        });
    },
    components: {
        VueDatePicker,
        InfoAlert
    },
    computed: {
        weights (): WeightData[] {
            return this.statStore.weights.filter(weight => {
                const year = Number(weight.attributes.date.slice(0, 4));
                const month = Number(weight.attributes.date.slice(5, 7)) - 1;

                if (year === this.month.year && month === this.month.month) {
                    return true;
                } else {
                    return false;
                }
            })
        }
    }
});
</script>
