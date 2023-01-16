// https://wger.de/api/v2/exercisecategory/
// https://wger.de/api/v2/exerciseinfo/
// https://wger.de/api/v2/exercisebaseinfo/
// https://wger.de/api/v2/exercise/
// https://wger.de/api/v2/exercise-translation/
// https://wger.de/api/v2/exercise-base/
// https://wger.de/api/v2/equipment/
// https://wger.de/api/v2/exerciseimage/
// https://wger.de/api/v2/exercisecomment/
// https://wger.de/api/v2/exercisealias
// https://wger.de/api/v2/muscle

const allExercises = (() => {
  let allData = []

  fetch('https://wger.de/api/v2/exercise?limit=999&language=2')
    .then(response => response.json())
    .then(value => {
      allData = value
    })

  return allData
})()

export default allExercises
