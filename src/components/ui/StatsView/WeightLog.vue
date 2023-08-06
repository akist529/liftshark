<template>
<v-card class="WeightLog">
    <v-card-title>
        <h1>Weight Log</h1>
    </v-card-title>
    <v-card-text>
        <v-table>
            <tbody>
                <tr>
                    <th>DATE</th>
                    <th>WEIGHT</th>
                </tr>
                <tr v-for="weight in statStore.weights" :key="weight.id">
                    <td>{{ weight.attributes.date }}</td>
                    <td>{{ weight.attributes.measurement }}</td>
                </tr>
            </tbody>
        </v-table>
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

        return ({
            statStore
        });
    }
});
</script>

<style scoped lang="scss">
.WeightLog {
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
            background-image: url('/public/images/icons/heart.webp');
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
        }
    }
}
</style>
