<template>
<v-alert
    closable
    icon="$vuetify"
    :text="text">
        <v-alert-title>Request Succeeded</v-alert-title>
</v-alert>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        text: {
            type: String as PropType<string>,
            required: true
        }
    }
})
</script>

<style scoped lang="scss">

</style>
