import { defineComponent } from 'vue';
import { fetchData } from '@/mixins/fetchData';
import { Exercise } from '@/types/index';

export const fetchExerciseData = defineComponent({
    mixins: [fetchData],
    methods: {
        async getExerciseData (name: string) {
            const data = await this.getResults(`https://wger.de/api/v2/exercise/?name=${name}&language=2`, 'name')

            if (data && data.length) return data[0] as Exercise;
                else return undefined;
        }
    }
});
