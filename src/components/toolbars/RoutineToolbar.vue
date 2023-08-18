<template>
<v-toolbar
    class="mx-auto"
    color="primary"
    density="compact"
>
    <v-toolbar-title>Actions</v-toolbar-title>
    <v-toolbar-items>
        <RoutineModal
            @showSnackBar="$emit('showSnackBar')"
        />
    </v-toolbar-items>
</v-toolbar>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Local components
import RoutineModal from '../../components/modals/RoutineModal.vue';

export default defineComponent({
    components: {
        RoutineModal
    }
})
</script>
