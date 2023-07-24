<template>
<nav class="ExerciseNavBar">
    <BackButton
        @click="previousPage()" />
    <div class="page-buttons">
        <ExerciseNavButton v-for="page in Math.ceil((data.count / 20))"
            :key="page"
            :page="page"
            @click="goToPage(page)" />
    </div>
    <ForwardButton
        @click="nextPage()" />
</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useExerciseStore } from '@/stores/exerciseStore';
// Local components
import BackButton from '@/components/buttons/BackButton.vue';
import ForwardButton from '@/components/buttons/ForwardButton.vue';
import ExerciseNavButton from '@/components/ui/ExercisesView/ExerciseNavBar/ExerciseNavButton.vue';

export default defineComponent({
    data () {
        const exerciseStore = useExerciseStore();

        return ({
            exerciseStore
        });
    },
    components: {
        BackButton,
        ForwardButton,
        ExerciseNavButton
    },
    props: ['data', 'refetch'],
    methods: {
		nextPage () {
			if (this.data && this.data.next !== null) {
				this.exerciseStore.updateUrl(this.data.next);
				this.refetch();
				(this.$refs.view as HTMLDivElement).scrollTo({ top: 0, behavior: 'smooth' });
			}
		},
		previousPage () {
			if (this.data && this.data.previous !== null) {
				this.exerciseStore.updateUrl(this.data.previous);
				this.refetch();
				(this.$refs.view as HTMLDivElement).scrollTo({ top: 0, behavior: 'smooth' });
			}
		},
		goToPage (page: number) {
			const offset = (page - 1) * 20;

			this.exerciseStore.updateUrl(`https://wger.de/api/v2/exercise/?limit=20&offset=${offset}&language=2`);
			this.refetch();
			// (this.$refs.view as HTMLDivElement).scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
});
</script>

<style scoped lang="scss">
	.ExerciseNavBar {
		display: flex;
			justify-content: space-evenly;
            align-items: center;
		width: 100%;

		.page-buttons {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
		}
	}
</style>
