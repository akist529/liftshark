<template>
<v-alert
    :max-width="650"
    border="start"
    border-color="red-accent-1"
    elevation="2"
    type="info"
    :title="title"
    :text="text"
></v-alert>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';

export default defineComponent({
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
