<script setup lang="ts">
const links = [
  {
    id: 3,
    title: 'Recettes',
    url: '/',
  },
]
</script>

<template>
  <nav class="bg-gray-800 text-white">
    <div class="container mx-auto flex justify-center py-4">
      <ul class="flex gap-4">
        <NuxtLink v-for="link in links" :key="link.id" :to="link.url" class="hover:text-gray-400 inline-block bg-transparent hover:bg-gray-700 text-lg text-white font-semibold py-2 px-4 border border-gray-600 rounded-lg no-underline">{{ link.title }}</NuxtLink> <!-- Modification ici -->
      </ul>
    </div>
  </nav>
</template>