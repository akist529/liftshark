<template>
<v-toolbar
    class="mx-auto"
    color="primary"
    density="compact"
>
    <v-toolbar-title>Actions</v-toolbar-title>
    <v-toolbar-items>
        <AddStatModal
            @weight="$emit('weight')"
            @measure="$emit('measure')"
            @prs="$emit('prs')"
            @showSnackBar="$emit('showSnackBar')"
        />
    </v-toolbar-items>
</v-toolbar>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Local components
import AddStatModal from '../modals/StatsView/AddStatModal.vue';

export default defineComponent({
    components: {
        AddStatModal
    }
})
</script>
