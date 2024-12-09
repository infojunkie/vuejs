<template>
  <div class="px-6 py-4 bg-slate-100">
    <div class="mb-2 text-xl font-bold">{{ title }}</div>
  </div>
  <div class="p-4">
    <img class="w-full" :src="imageUrl" width="100" height="100" :alt="title" />
  </div>
</template>

<script>
export default {
  props: {
    image: Object,
    title: String,
    teaser: String,
    urlTitle: String
  },
  inject: ['data'], // Assuming 'data' is provided and contains 'viewAs' with 'language'
  computed: {
    languageId() {
      return this.data.viewAs.language.id
    },
    imageUrl() {
      // Access environment variables in the script block
      const host = import.meta.env.VITE_DOTCMS_HOST
      return `${host}${this.image.thumbnailUri}?language_id=${this.languageId}`
    }
  }
}
</script>
