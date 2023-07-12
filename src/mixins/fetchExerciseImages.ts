import { defineComponent } from 'vue';
import { fetchData } from '@/mixins/fetchData';
import { Image } from '@/types/index';

export const fetchExerciseImages = defineComponent({
    mixins: [fetchData],
    methods: {
        async getExerciseImages (base: number) {
            const images = await this.getResults(`https://wger.de/api/v2/exerciseimage/?limit=999&exercise_base=${base}`, 'id');

            if (images) return images as Image[];
                else return [];
        }
    }
});
