import { defineComponent } from 'vue';

export const getCorrectName = defineComponent({
    methods: {
        getCorrectName (name: string) {
			console.log(name);

			const splitName = name.replaceAll('  ', ' ').split(' ');
			const correctNameArray: string[] = [];

			for (const word of splitName) {
				const correctWord = word[0].toUpperCase() + word.substring(1);
				correctNameArray.push(correctWord);
			}

			const correctName = correctNameArray.join(' ');
			return correctName;
		}
    }
});
