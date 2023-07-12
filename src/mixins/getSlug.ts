import { defineComponent } from 'vue';

export const getSlug = defineComponent({
    methods: {
        getSlug (text: string) {
            return text.split(' ')
                .join('-')
                .replaceAll('(', '')
                .replaceAll(')', '')
                .toLowerCase();
        }
    }
});
