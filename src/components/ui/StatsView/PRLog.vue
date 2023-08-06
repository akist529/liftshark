<template>
<v-card v-if="isSuccess && data" class="PRLog">
    <v-card-title>
        <h1>PR Log</h1>
    </v-card-title>
    <v-card-actions>
        <v-select
            v-model="exercise"
            label="Exercise"
            :placeholder="data.results[0].name"
            :items="data.results.map(exercise => exercise.name)"
        ></v-select>
    </v-card-actions>
    <v-card-text>
        <v-table v-if="filteredRecords?.length">
            <tbody>
                <tr>
                    <th>DATE</th>
                    <th>PR (LBS.)</th>
                </tr>
                <tr v-for="record in filteredRecords" :key="record.id">
                    <td>{{ record.attributes.date }}</td>
                    <td>{{ record.attributes.max }}</td>
                </tr>
            </tbody>
        </v-table>
        <strong v-else>No PRs logged.</strong>
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
import { useExerciseStore } from '@/stores/exerciseStore';
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
        const exerciseStore = useExerciseStore();
        const exercise = '';
		const { error, isError, isLoading, isFetching, isSuccess, data, refetch } = useQuery(['exercises', exerciseStore.url], () => getData(exerciseStore.url));

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
    computed: {
        filteredRecords () {
			const exercise = this.data?.results.find(exercise => exercise.name === this.exercise);
			if (!exercise) return;

            return this.statStore.records.filter(record => record.attributes.exercise === exercise.exercise_base);
        }
    }
});
</script>

<style scoped lang="scss">
.PRLog {
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
            background-image: url('/public/images/icons/weightlift.webp');
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
        }
    }
}
</style>
