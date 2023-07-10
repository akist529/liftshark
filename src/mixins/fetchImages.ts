export const fetchImages = {
	data () {
		const assetspath = require.context('@/../public/images', true, /\.(webp|svg)$/);

		return ({
			assetspath
		});
	}
}
