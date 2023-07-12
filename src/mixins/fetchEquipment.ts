import { defineComponent } from 'vue';
import { fetchData } from '@/mixins/fetchData';
import { Equipment } from '@/types/index';

export const fetchEquipment = defineComponent({
    data () {
        const equipment: Equipment[] = [];
        const error = false;

        return ({
            equipment,
            error
        });
    },
    mixins: [fetchData],
    async created () {
        await this.getResults('https://wger.de/api/v2/equipment?limit=999', 'name')
            .then(data => {
                if (data && data.length) this.equipment = data;
                    else this.error = true;
            }).catch(error => {
                console.log(error);
                this.error = true;
            });
    }
});
