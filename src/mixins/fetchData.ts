export const fetchData = {
	methods: {
		getData: async function (url: string) {
			try {
				const response = await fetch(url);
				return await response.json();
			} catch (error) {
				console.log(error);
			}
		},
		getResults: async function (url: string, key: string) {
			const data = await this.getData(url);
			const results: any[] = data.results;

			if (results === null || results === undefined) {
				return null;
			} else {
				const uniqueValues = [...new Map(results.map(item => [item[key], item])).values()];
				return uniqueValues;
			}
		}
	}
}
