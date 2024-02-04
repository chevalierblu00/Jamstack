<script lang="ts" setup>
import RecipeCard from '~/components/RecipeCard.vue'
import type { ITag } from '~/models/recipes.model'

const { find } = useStrapi4()
const search = useSearchStore()

const { data: tags } = useAsyncData(
  'tags',
  () => find<{ data: ITag[] }>('tags'),
)

function addTag(tag: string) {
  if (!search.queryTags.includes(tag))
    search.queryTags.push(tag)
  else search.queryTags = search.queryTags.filter(t => t !== tag)
}
</script>

<template>
  <div class="container mx-2">
    <div v-if="!search.pending && search.sortedByTags" class="flex flex-col gap-y-4 ">
      <h1 class="mb-4 text-3xl font-semibold">
        Carte
      </h1>
      <aside class="flex gap-4 lg:w-2/4 lg:mr-4 mx-20">
        <div class="flex flex-col space-y-4 mb-20 md:mb-0 md:mr-16 " role="search">
          <label for="search" class="text-gray-600">Chercher :</label>
          <input
            id="search"
            v-model="search.query"
            class="pr-100 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            type="search"
          />
        </div>

<div class="flex flex-col items-start space-y-4">
  <p class="text-lg font-semibold mb-4">Filtrer par tag :</p>
  <div class="flex flex-wrap gap-2" role="group">
    <button
      v-for="tag in tags?.data"
      :key="tag.id"
      :class="[
        'py-1 px-4 border-none cursor-pointer rounded-full transition-colors duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-800',
        search.queryTags.includes(tag.slug) ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
      ]"
      :title="tag.name"
      @click="addTag(tag.slug)"
    >
      {{ tag.name }}
    </button>
  </div>
  <button
    class="text-gray-600 hover:underline focus:outline-none"
    @click="search.resetTags"
  >
    Réinitialiser les tags
  </button>
</div>
      </aside>
      <client-only>
        <div class="lg:w-4/4 mx-0">
          <h2 class="text-lg font-semibold">Résultats de recherche : </h2>
          <ul
            v-if="search.sortedByTags.length"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 no-underline"
            style="padding-left: 0px;"
          >
            <RecipeCard
              v-for="recipe in search.sortedByTags"
              :key="recipe.id"
              :recipe="recipe"
              class="rounded-lg overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-lg "
            />
          </ul>
          <p v-else class="text-gray-600">
            Aucun résultat pour cette recherche
          </p>
        </div>
      </client-only>
    </div>
  </div>
</template>
