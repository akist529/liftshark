<template>
<v-toolbar
    class="px-5 py-1"
    color="primary"
    density="compact"
    extended
>
    <v-toolbar-title
        class="flex align-center text-center"
    >
        <v-icon
            icon="mdi-account-search"
        ></v-icon>
        My Stats
    </v-toolbar-title>
    <template v-slot:extension>
        <v-tabs
            v-model="statStore.tab"
            bg-color="primary"
            class="w-100 bg-primary"
            align-tabs="center"
            fixed-tabs
            show-arrows
            centered
            :stacked="windowStore.width < 992"
        >
            <v-tab
                value="weight"
            >
                <v-icon
                    icon="mdi-scale-bathroom"
                ></v-icon>
                <span v-if="windowStore.width >= 600">Weight</span>
            </v-tab>
            <v-tab
                value="measurement"
            >
                <v-icon
                    icon="mdi-tape-measure"
                ></v-icon>
                <span v-if="windowStore.width >= 600">Measurements</span>
            </v-tab>
            <v-tab
                value="record"
            >
                <v-icon
                    icon="mdi-weight-lifter"
                ></v-icon>
                <span v-if="windowStore.width >= 600">Records</span>
            </v-tab>
        </v-tabs>
        <v-toolbar-items>
            <AddStatModal
                @weight="$emit('weight')"
                @measure="$emit('measure')"
                @prs="$emit('prs')"
                @showSnackBar="$emit('showSnackBar')"
            />
        </v-toolbar-items>
    </template>
</v-toolbar>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Local components
import AddStatModal from '../modals/StatsView/AddStatModal.vue';
// Pinia stores
import { useWindowStore } from '@/stores/windowStore';
import { useStatStore } from '@/stores/statStore';

export default defineComponent({
    data () {
        return ({
            windowStore: useWindowStore(),
            statStore: useStatStore()
        });
    },
    components: {
        AddStatModal
    }
})
</script>
