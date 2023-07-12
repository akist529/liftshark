<template>
<div class="DatePicker">
	<DateLeftButton
        @changeDateBack="$emit('changeDateBack')" />
	<DateModalButton
        @openCalendar="$emit('openCalendar')" />
	<DateRightButton
        @changeDateForward="$emit('changeDateForward')" />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// Local components
import DateLeftButton from './DatePicker/DateLeftButton.vue';
import DateModalButton from './DatePicker/DateModalButton.vue';
import DateRightButton from './DatePicker/DateRightButton.vue';

export default defineComponent({
    data () {
        return ({
            date: new Date()
        });
    },
    components: {
        DateLeftButton,
        DateModalButton,
        DateRightButton
    }
});
</script>

<style scoped lang="scss">
.DatePicker {
    display: flex;
		gap: 10px;
		align-items: center;
}
</style>
