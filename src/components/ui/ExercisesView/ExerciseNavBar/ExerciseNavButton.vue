<template>
<button :class="isSelectedPage ? 'ExerciseNavButton active' : 'ExerciseNavButton inactive'">
    {{ page }}
</button>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Pinia stores
import { useExerciseStore } from '../../../../stores/exerciseStore';

export default defineComponent({
    data () {
        const exerciseStore = useExerciseStore();

        return ({
            exerciseStore: exerciseStore
        });
    },
    props: {
        page: {
            type: Number as PropType<number>,
            required: true
        }
    },
    computed: {
        isSelectedPage () {
            if (!this.exerciseStore.url) return false;

			const urlOffset = this.exerciseStore.url.split('&').filter((item: string) => item.slice(0, 6) === 'offset');
			let offset = 0;

			if (urlOffset.length) offset = Number(urlOffset[0].slice(7));
				else return false;

            if ((Math.ceil(offset / 20) + 1) === this.page) {
                return true;
            } else return false;
        }
    }
});
</script>

<style scoped lang="scss">
.ExerciseNavButton {
    padding: 10px;
    font-weight: 700;
    border: none;
        border-radius: 50%;
    cursor: pointer;
    display: flex;
        justify-content: center;
        align-items: center;
}

.active {
    background-color: var(--button-bg-color);
    width: 35px;
    height: 35px;
}

.inactive {
    background-color: rgb(200,200,200);
    width: 30px;
    height: 30px;
}
</style>
