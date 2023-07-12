<template>
<button class="NextMonthButton" title="Next Month" @click="$emit('changeMonthForward')">
    <span>{{ months[(selectedMonth + 12 + 1) % 12] }}</span>
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
.NextMonthButton {
    /* Positioning */
    display: flex;
        justify-content: center;
        align-items: center;

    /* Visual */
    background: none;
    border: none;
    cursor: pointer;

    &::before {
        background-image: url('/public/images/icons/chevron_right.svg');
            background-size: contain;
            background-repeat: no-repeat;
        width: 32px;
        height: 32px;
        content: '';
    }
}
</style>
