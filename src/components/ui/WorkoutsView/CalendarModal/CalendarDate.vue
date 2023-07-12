<template>
<div class="CalendarDate">
    <span id="date">{{ selectedDate }}</span>
    <hr/>
    <div>
        <span>{{ months[selectedMonth] }}</span>
        <span>{{ selectedYear }}</span>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
    data () {
        const months: string[] = inject('months') || [];
        const selectedYear: number = inject('selectedYear') || 0;
		const selectedMonth: number = inject('selectedMonth') || 0;
		const selectedDate: number = inject('selectedDate') || 0;

        return ({
            months,
            selectedYear,
            selectedMonth,
            selectedDate
        });
    }
});
</script>

<style scoped lang="scss">
.CalendarDate {
    display: flex;
        gap: 10px;

    #date {
        font-size: 48px;
    }

    div {
        /* Positioning */
        display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

        /* Visual */
        font-size: 24px;
    }
}
</style>
