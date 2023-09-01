<template>
<v-card
    v-if="isSuccess && data"
    :class="modeStore.darkMode ? 'bg-blue-grey-darken-3 mx-auto' : 'bg-blue-grey-lighten-3 mx-auto'"
    :width="300"
>
    <template
        v-slot:prepend
    >
        <v-icon
            icon="mdi-medal"
            size="xx-large"
        ></v-icon>
    </template>
    <template
        v-slot:title
    >1-Rep Max</template>
    <v-card-actions>
        <v-select
            v-model="exercise"
            label="Exercise"
            :placeholder="data.results[0].name"
            :items="data.results.map(exercise => exercise.name)"
        ></v-select>
    </v-card-actions>
    <v-card-text>
        <v-table
            v-if="filteredRecords()?.length"
            :class="modeStore.darkMode ? 'bg-blue-grey-darken-4 text-white text-center mt-3' : 'bg-blue-grey-lighten-4 text-black text-center mt-3'"
        >
            <tbody>
                <tr>
                    <th class="flex text-center">DATE</th>
                    <th class="flex text-center">MAX (LBS.)</th>
                </tr>
                <tr
                    v-for="record in filteredRecords()"
                    :key="record.id"
                >
                    <td>{{ record.attributes.date }}</td>
                    <td>{{ record.attributes.max }}</td>
                </tr>
            </tbody>
        </v-table>
        <InfoAlert
            v-else
            title="No Records"
            text=""
            class="mt-3"
        />
    </v-card-text>
</v-card>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Vue Query imports
import { useQuery } from 'vue-query';
// Pinia stores
import { useStatStore } from '@/stores/statStore';
import { useModeStore } from '@/stores/modeStore';
// Type interfaces
import { ExerciseData } from '@/types/index';
// Local components
import InfoAlert from '../alerts/InfoAlert.vue';

const getData = async (url: string): Promise<ExerciseData> => {
	return await fetch(url)
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
    data () {
		const { error, isError, isLoading, isFetching, isSuccess, data, refetch } = useQuery('exercises', () => getData('https://wger.de/api/v2/exercise/?language=2&limit=999'));

        return ({
            statStore: useStatStore(),
            modeStore: useModeStore(),
            exercise: '',
            error,
            isError,
            isLoading,
            isFetching,
            isSuccess,
            data,
            refetch
        });
    },
    methods: {
        filteredRecords () {
			const exercise = this.data?.results.find(exercise => exercise.name === this.exercise);
			if (!exercise) return;

            return this.statStore.records.filter(record => record.attributes.exercise === exercise.exercise_base);
        }
    },
    components: {
        InfoAlert
    }
});
</script>
