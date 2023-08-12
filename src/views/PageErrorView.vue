<template>
<v-container>
    <h1>Page Not Found</h1>
    <MyFooter />
</v-container>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Local imports
import MyFooter from '@/components/MyFooter.vue';

export default defineComponent({
    components: {
        MyFooter
    }
});
</script>
