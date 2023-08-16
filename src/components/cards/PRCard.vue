<template>
<v-card
    v-if="isSuccess && data"
    class="mx-auto"
    width="400"
>
    <template
        v-slot:prepend
    >
        <v-icon
            icon="mdi-weight-lifter"
            size="xx-large"
            color="primary"
        ></v-icon>
    </template>
    <template
        v-slot:title
    >PR Log</template>
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
        >
            <tbody>
                <tr>
                    <th>DATE</th>
                    <th>PR (LBS.)</th>
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
        <strong
            v-else
        >No PRs logged.</strong>
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
// Type interfaces
import { ExerciseData } from '@/types/index';

const getData = async (url: string): Promise<ExerciseData> => {
	return await fetch(url)
		.then(res => res.json())
		.catch(err => console.log(err));
}

export default defineComponent({
    data () {
        const statStore = useStatStore();
        const exercise = '';
		const { error, isError, isLoading, isFetching, isSuccess, data, refetch } = useQuery('exercises', () => getData('https://wger.de/api/v2/exercise/?language=2&limit=999'));

        return ({
            statStore,
            exercise,
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
    }
});
</script>
