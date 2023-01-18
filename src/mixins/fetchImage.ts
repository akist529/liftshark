export const fetchImage = {
  data () {
    const assetspath = require.context('@/../public/images/ui/exercises', false, /\.webp$/)

    return {
      assetspath
    }
  }
}
