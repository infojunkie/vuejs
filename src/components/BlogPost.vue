<template>
  <div class="px-6 py-4">
    <div class="mb-2 text-xl font-bold">{{ title }}</div>
  </div>
  <div class="p-4">
    <img class="w-full" :src="imageUrl" width="100" height="100" :alt="title" />
  </div>
  <router-link
    class="inline-block px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
    :to="`/blog/post/${inode || '#'}`"
  >
    Read More
  </router-link>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  props: {
    image: Object,
    title: String,
    teaser: String,
    urlTitle: String,
    identifier: String,
    inode: String,
    postingDate: Number,
    tags: Array,
  },
  inject: ['data'], // Assuming 'data' is provided and contains 'viewAs' with 'language'
  computed: {
    languageId() {
      return this.data.viewAs.language.id
    },
    imageUrl() {
      // Access environment variables in the script block
      const host = import.meta.env.VITE_DOTCMS_HOST
      return `${host}${this.image.rawUri}?language_id=${this.languageId}`
    }
  }
}
</script>
