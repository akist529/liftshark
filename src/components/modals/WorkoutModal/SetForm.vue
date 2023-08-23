<template>
<v-container>
    <v-row>
        <v-col class="d-flex justify-center align-center">
            <v-label>Set #{{ setCount }}</v-label>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="d-flex flex-column justify-center align-center">
            <v-text-field
                v-model="repCount"
                hide-details="auto"
                density="compact"
                type="number"
                style="width: 70px"
                :id="`exc-${exerciseCount}-repCount-${setCount}`"
                :name="`exc-${exerciseCount}-repCount-${setCount}`"
                label="reps"
                :min="1"
                :max="100"
            ></v-text-field>
        </v-col>
        <v-col class="d-flex flex-column justify-center align-center">
            <v-text-field
                v-model="weight"
                hide-details="auto"
                density="compact"
                type="number"
                style="width: 70px"
                :id="`exc-${exerciseCount}-weight-${setCount}`"
                :name="`exc-${exerciseCount}-weight-${setCount}`"
                label="lbs"
                :min="0"
                :max="1000"
            ></v-text-field>
        </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    data () {
        const repCount = 1;
        const weight = 0;

        return ({
            repCount,
            weight
        });
    },
    props: {
        exerciseCount: {
            type: Number as PropType<number>,
            required: true
        },
        setCount: {
            type: Number as PropType<number>,
            required: true
        }
    }
})
</script>
