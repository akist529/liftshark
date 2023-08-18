<template>
<v-card
    class="mx-auto"
    :width="200"
>
    <template
        v-slot:prepend
    >
        <v-icon
            icon="mdi-scale-bathroom"
            size="xx-large"
            color="primary"
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
        />
        <v-table
            v-if="weights.length"
            class="text-center mt-3"
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
        <v-alert
            v-else
            class="mt-3"
            :max-width="650"
            border="start"
            border-color="red-accent-1"
            elevation="2"
            type="info"
            title="No Weights"
        ></v-alert>
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
// Type interfaces
import { WeightData } from '@/types';

export default defineComponent({
    data () {
        const month = ref({
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        });

        return ({
            statStore: useStatStore(),
            month
        });
    },
    components: {
        VueDatePicker
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
