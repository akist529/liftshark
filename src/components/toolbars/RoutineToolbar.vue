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
            icon="mdi-notebook"
        ></v-icon>
        My Routines
    </v-toolbar-title>
    <template v-slot:extension>
        <v-tabs
            v-model="routineStore.activeDay"
            bg-color="primary"
            :class="windowStore.width < 992 ? 'w-100' : ''"
            align-tabs="center"
            :fixed-tabs="windowStore.width < 992"
            show-arrows
            centered
        >
            <v-tab
                v-for="(day, index) in routineStore.weekdays"
                :key="index"
                :value="index"
            >
                <i
                    class="icon"
                    :style="{backgroundImage: `url(/images/icons/${day.toLowerCase()}.webp)`}"
                ></i>
                <span v-if="windowStore.width >= 1110">{{ day }}</span>
            </v-tab>
        </v-tabs>
        <v-spacer
            v-if="windowStore.width >= 992"
        ></v-spacer>
        <v-toolbar-items>
            <RoutineModal
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
import RoutineModal from '../../components/modals/RoutineModal.vue';
// Pinia stores
import { useRoutineStore } from '@/stores/routineStore';
import { useWindowStore } from '@/stores/windowStore';

export default defineComponent({
    data () {
        return ({
            routineStore: useRoutineStore(),
            windowStore: useWindowStore()
        });
    },
    components: {
        RoutineModal
    }
})
</script>

<style scoped>
.icon {
    background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    content: '';
    width: 24px;
    height: 24px;
    display: inline-block;
    filter: invert(1);
}

span {
    display: inline-block;
}
</style>
