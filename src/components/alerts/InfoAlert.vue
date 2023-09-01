<template>
<v-alert
    :max-width="650"
    border="start"
    elevation="2"
    type="info"
    :title="title"
    :text="text"
    :variant="modeStore.darkMode ? 'tonal' : 'flat'"
></v-alert>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Pinia stores
import { useModeStore } from '@/stores/modeStore';

export default defineComponent({
    data () {
        return ({
            modeStore: useModeStore()
        });
    },
    props: {
        title: {
            type: String as PropType<string>,
            required: true
        },
        text: {
            type: String as PropType<string>,
            required: true
        }
    }
})
</script>
