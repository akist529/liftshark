<template>
<v-dialog
    scrollable
	persistent
	v-model="dialog"
	class="w-100 h-100"
	:max-width="windowStore.width >= 600 ? '400px' : '100%'"
>
</v-dialog>
</template>

<script lang="ts">
// Vue imports
import { defineComponent } from 'vue';
// Pinia stores
import { useWindowStore } from '../../../stores/windowStore';

export default defineComponent({
data () {
    return ({
        windowStore: useWindowStore(),
        dialog: false
    });
}
})
</script>
