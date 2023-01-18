<template>
    <li className="ExerciseWrapper">
        <main><b>{{ name }}</b></main>
        <ul v-if="muscles.length">
          <header><b>Primary Muscles:</b></header>
          <li v-for="muscle in muscles" :key="muscle">
            <img :muscle="muscle" :alt="muscle" :title="muscle" :src="assetspath(`./${getFileName(muscle)}`)" />
          </li>
        </ul>
        <ul v-if="secondaryMuscles.length">
          <header><b>Secondary Muscles:</b></header>
          <li v-for="muscle in secondaryMuscles" :key="muscle">
            <img :muscle="muscle" :alt="muscle" :title="muscle" :src="assetspath(`./${getFileName(muscle)}`)" />
          </li>
        </ul>
        <ul v-if="equipment.length">
          <header><b>Equipment</b></header>
          <li v-for="item in equipment" :key="item">
            <img :item="item" :alt="item" :title="item" :src="assetspath(`./${getFileName(item)}`)" />
          </li>
        </ul>
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
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;

  main {
    margin: 0 auto;
  }

  ul {
    list-style-type: none;
    display: grid;
    grid-template-rows: repeat(auto-fill, auto);
    grid-template-columns: repeat(4, auto);

    li {
      img {
        max-width: 32px;
        max-height: 32px;
        width: auto;
        height: auto;
      }
    }
  }

  img {
    width: 15vw;
    height: auto;
  }
}
</style>
