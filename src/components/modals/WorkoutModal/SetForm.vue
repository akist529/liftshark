<template>
<div class="SetForm">
    <div class="set-reps">
        <span>reps</span>
        <input
            type="number"
            min="1"
            max="100"
            :id="`repCount-${count}`" />
    </div>
    <div class="set-weight">
        <span>lbs.</span>
        <input
            type="number"
            min="1"
            max="500"
            :id="`weight-${count}`" />
    </div>
</div>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        count: {
            type: Number as PropType<number>,
            required: true
        }
    }
})
</script>

<style scoped lang="scss">
.SetForm {
    display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        align-items: center;

    input {
        width: 48px;
    }

    .set-reps,
    .set-weight {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>
