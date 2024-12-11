<script>
import { docToHtml } from '@/utils/docToHtml';
import VueFlicking from "@egjs/vue3-flicking";

export default {
  props: {
    inode: String
  },
  components: {
    Flicking: VueFlicking,
  },
  data() {
    return {
      loading: false,
      post: null,
      error: null,
      banners: null,
    }
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params.inode,
      this.fetchData,
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  methods: {
    async fetchData(inode) {
      this.error = this.post = null
      this.loading = true

      try {
        // Get blog via Content API endpoint.
        const response = await fetch(import.meta.env.VITE_DOTCMS_HOST + '/api/content/inode/' + inode, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_DOTCMS_TOKEN}`,
          },
        })
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        this.post = { ...data.contentlets[0], body: docToHtml([data.contentlets[0].blogContent]) }

        // Get promos via GraphQL endpoint.
        // FIXME: How to query GraphQL to return nodes with link != null?
        // FIXME: How to find schema of image?
        const response2 = await fetch(import.meta.env.VITE_DOTCMS_HOST + '/api/v1/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_DOTCMS_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
query ContentAPI {
  BannerCollection(
    limit: 10,
  ) {
    title
    caption
    link
    inode
  }}
            `.trim()
          })
        })
        if (!response2.ok) throw new Error(response2.statusText)
        const data2 = await response2.json()
        if ('errors' in data2) throw new Error(data2.errors.map(e => e.message).join("\n"))
        this.banners = data2.data.BannerCollection.filter(b => !!b.link)
      } catch (err) {
        this.error = err.toString()
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style>
.flicking-panel {
  width: 100%;
}
</style>

<template>
  <div v-if="loading" class="loading">Loading...</div>

  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="post" class="content">
    <Flicking :options="{ align: 'prev', circular: true }">
      <div class="flicking-panel" v-for="banner in banners" :key="banner.inode">
        <div class="relative w-full p-4 bg-gray-200 h-96">
          <img class="object-cover w-full h-full" :src="banner.link" :alt="banner.title" />
          <div
            class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white"
          >
            <h2 class="mb-2 text-6xl font-bold text-shadow">{{ banner.title }}</h2>
            <p class="mb-4 text-xl text-shadow">{{ banner.caption }}</p>
            <router-link
              class="p-4 text-xl transition duration-300 bg-purple-500 rounded hover:bg-purple-600"
              :to="banner.link || '#'"
            >
              Read More
            </router-link>
          </div>
        </div>
      </div>
    </Flicking>

    <h2>{{ post.title }}</h2>
    <article v-html=post.body></article>
  </div>
</template>
