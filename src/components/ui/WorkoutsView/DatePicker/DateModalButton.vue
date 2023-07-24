<template>
<button class="DateModalButton" title="Change Date" @click="workoutStore.openCalendar">
    <span v-if="dateIsToday"
        id="img-today"></span>
    <span v-else
        id="img-month"></span>
    <span v-if="dateIsToday"
        id="today">Today</span>
    <div v-else>
        <span>{{ workoutStore.months[workoutStore.selectedMonth] }}</span>
        <hr/>
        <span>{{ workoutStore.selectedDate }}</span>
    </div>
</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useWorkoutStore } from '@/stores/workoutStore';

export default defineComponent({
    data () {
        const workoutStore = useWorkoutStore();

        return ({
            date: new Date(),
            workoutStore
        });
    },
    computed: {
        dateIsToday () {
            const dateSelected = `${this.workoutStore.selectedYear}-${this.workoutStore.selectedMonth}-${this.workoutStore.selectedDate}`;
			const actualDate = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`;

            if (actualDate === dateSelected) {
				return true;
			} else return false;
        }
    }
});
</script>

<style scoped lang="scss">
.DateModalButton {
    /* Positioning */
    display: flex;

    /* Visual */
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px 10px;

    &:hover {
        background: rgb(235,235,235);
    }

    > div {
        display: flex;
        gap: 10px;
	}

    span {
        font-size: 32px;
    }

    #today {
        font-weight: 700;
    }

    #img-today {
        background-image: url('/public/images/icons/today.svg');
        background-size: contain;
        background-repeat: no-repeat;
        width: 40px;
        height: 40px;
        content: '';
    }

    #img-month {
        background-image: url('/public/images/icons/month.svg');
        background-size: contain;
        background-repeat: no-repeat;
        width: 40px;
        height: 40px;
        content: '';
    }
}
</style>
