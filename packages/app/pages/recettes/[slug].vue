<script setup lang="ts">
const { findOne } = useStrapi4();
const route = useRoute();

const { data: recipe, pending } = useAsyncData(
    'recipe',
    () => findOne(`recipes/${route.params.slug}`)
)
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

img {
  max-width: 100%;
  height: auto;
}

h1, h2 {
  font-family: Arial, sans-serif;
}

p {
  font-size: 1rem;
  line-height: 1.5;
}

ol {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 5px;
}
</style>

<template>
  <div class="container">
    
    <template v-if="recipe">
      <h1>{{ recipe.data.title }}</h1>
      <img :src="recipe.data.image.url" :alt="recipe.data.title">
      <p class="my-0">{{ recipe.data.description }}</p>
    </template>

    <H2>ingredients</H2>
    <ol>
      <li v-for="ingredient in recipe.data.ingredients" :key="ingredient.id"> {{ ingredient.nom }}</li>
    </ol>
  </div>
</template>