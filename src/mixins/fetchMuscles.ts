import { defineComponent } from 'vue';
import { fetchData } from '@/mixins/fetchData';
import { Muscle } from '@/types/index';

export const fetchMuscles = defineComponent({
    data () {
        const muscles: Muscle[] = [];
        const error = false;

        return ({
            muscles,
            error
        });
    },
    mixins: [fetchData],
    async created () {
        await this.getResults('https://wger.de/api/v2/muscle?limit=999', 'name')
            .then(data => {
                if (data) this.muscles = data;
                    else this.error = true;
            }).catch(error => {
                console.log(error);
                this.error = true;
            });
    }
});
