<template>
<v-row class="d-flex justify-center align-center">
	<v-col cols="1">
		<BackButton
			@click="previousPage()" />
	</v-col>
	<v-col cols="10">
		<v-list class="d-inline-flex flex-wrap justify-center align-center w-100">
			<v-list-item v-for="page in Math.ceil((data.count / 20))" :key="page">
				<ExerciseNavButton
					:page="page"
					@click="goToPage(page)" />
			</v-list-item>
		</v-list>
	</v-col>
	<v-col cols="1">
		<ForwardButton
			@click="nextPage()" />
	</v-col>
</v-row>
</template>

<script lang="ts">
// Vue imports
import { defineComponent, PropType } from 'vue';
// Pinia stores
import { useExerciseStore } from '@/stores/exerciseStore';
// Type interfaces
import { ExerciseData } from '@/types/index';
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
	props: {
		data: {
			type: Object as PropType<ExerciseData>,
			required: true
		},
		refetch: {
			type: Function as any,
			required: true
		}
	},
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
