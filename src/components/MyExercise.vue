<template>
    <li className="ExerciseWrapper">
        <main><b>{{ name }}</b></main>
        <div v-if="muscles.length">
          <header><b>Primary Muscles:</b></header>
          <ul>
            <li v-for="muscle in muscles" :key="muscle">
              <figure>
                <img :alt="muscle" :title="muscle" :src="assetspath(`./${getFileName(muscle)}`)" />
                <figcaption>{{ muscle }}</figcaption>
              </figure>
            </li>
          </ul>
        </div>
        <div v-if="secondaryMuscles.length">
          <header><b>Secondary Muscles:</b></header>
          <ul>
            <li v-for="muscle in secondaryMuscles" :key="muscle">
              <figure>
                <img :alt="muscle" :title="muscle" :src="assetspath(`./${getFileName(muscle)}`)" />
                <figcaption>{{ muscle }}</figcaption>
              </figure>
            </li>
          </ul>
        </div>
        <div v-if="equipment.length">
          <header><b>Equipment</b></header>
          <ul>
            <li v-for="item in equipment" :key="item">
              <figure>
                <img :alt="item" :title="item" :src="assetspath(`./${getFileName(item)}`)" />
                <figcaption>{{ item }}</figcaption>
              </figure>
            </li>
          </ul>
        </div>
        <img v-if="image" alt="Exercise Image" :src="image" className="exercise-image" />
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fetchData } from '@/mixins/fetchData'
import { fetchImages } from '@/mixins/fetchImages'

export default defineComponent({
  props: ['name', 'muscles', 'secondaryMuscles', 'equipment', 'image'],
  mixins: [fetchData, fetchImages],
  methods: {
    getFileName: function (item) {
      if (item === 'Obliquus externus abdominis') {
        return 'ui/exercises/obliques.webp'
      } else if (item === 'Soleus') {
        return 'ui/exercises/calves.webp'
      } else if (item === 'SZ-Bar') {
        return 'ui/exercises/ez-bar.webp'
      } else {
        return `ui/exercises/${item.toLowerCase().replaceAll(' ', '-').replaceAll(/[()]/g, '')}.webp`
      }
    }
  }
})
</script>

<style lang="scss">
.ExerciseWrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;

  main {
    margin: 0 auto;
    font-size: 1.5rem;
    text-align: center;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    header {
      font-size: 1.25rem;
    }

    ul {
      display: grid;
      grid-template-columns: repeat(3, minmax(0px, auto));
      grid-row-gap: 5px;
      margin: 0 auto;

      li {
        list-style-type: none;
        padding: 0 20px;

        figure {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          gap: 2px;
          min-height: 40px;

          img {
          max-width: 48px;
          max-height: 48px;
          width: auto;
          height: auto;
          }

          figcaption {
            font-size: 16px;
            text-align: center;
          }
        }
      }
    }
  }

  >img {
    min-width: 150px;
    width: 15vw;
    height: auto;
    margin: 0 auto;
  }
}
</style>
