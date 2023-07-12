<template>
<button class="PrevMonthButton" title="Previous Month" @click="$emit('changeMonthBack')">
    <span>{{ months[(selectedMonth + 12 - 1) % 12] }}</span>
</button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
    data () {
        const months: string[] = inject('months') || [];
        const selectedMonth: number = inject('selectedMonth') || 0;

        return ({
            months,
            selectedMonth
        });
    }
});
</script>

<style scoped lang="scss">
.PrevMonthButton {
    /* Positioning */
    display: flex;
        justify-content: center;
        align-items: center;

    /* Visual */
    background: none;
    border: none;
    cursor: pointer;

    &::after {
        background-image: url('/public/images/icons/chevron_left.svg');
            background-size: contain;
            background-repeat: no-repeat;
        width: 32px;
        height: 32px;
        content: '';
    }
}
</style>
