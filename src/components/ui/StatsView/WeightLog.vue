<template>
<v-card
    class="mx-auto"
    width="400"
>
    <template v-slot:prepend>
        <span
            id="icon"
        ></span>
    </template>
    <template v-slot:title>
        Weight Log
    </template>
    <v-card-text>
        <v-table v-if="statStore.weights.length">
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
        <strong v-else>No weights logged.</strong>
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
    },
    created () {
        console.log(this.statStore.weights);
    }
});
</script>

<style scoped lang="scss">
h1 {
    display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
}

#icon {
    display: inline-block;
    content: '';
    width: 48px;
    height: 48px;
    background-image: url('/public/images/icons/heart.webp');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
}
</style>
