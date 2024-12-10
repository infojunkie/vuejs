<script>
import { client } from '../utils/client'

export default {
  props: {
    inode: String,
    dataPath: String,
  },
  inject: ['data'],
  data() {
    return {
      loading: false,
      post: null,
      error: null,
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

      // TODO: Load GraphQL
      // https://demo.dotcms.com/api/v1/graphql
      /*
      query ContentAPI {
          BlogCollection(
            query: "+inode:4b337160-a5a3-42a7-b272-7b506603cb72",
            limit: 1,
          ) {
            title
            urlTitle
            inode
            identifier
          }
        }
          =>
        {
          "data": {
            "BlogCollection": [
              {
                "title": "French Polynesia Everything You Need to Know",
                "urlTitle": "french-polynesia-everything-you-need-to-know",
                "inode": "4b337160-a5a3-42a7-b272-7b506603cb72",
                "identifier": "2b100ac7-07b1-48c6-8270-dc01ff958c69"
              }
            ]
          }
        }
      */

      try {
        if (!this.data) {
          this.data = await client.page.get({ path: this.dataPath, language_id: 1 }).then(({ entity }) => entity)
        }
        this.post = {
          title: 'hi',
          body: 'hello'
        }
      } catch (err) {
        this.error = err.toString()
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <div v-if="loading" class="loading">Loading...</div>

  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="post" class="content">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
  </div>
</template>
