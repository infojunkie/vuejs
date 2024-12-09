<script>
import BlogPost from './BlogPost.vue'

export default {
  components: {
    BlogPost
  },
  name: 'BlogListing',
  props: {
    posts: Object
  },
}
</script>

<template>
  <BlogPost v-bind="post" v-for="post in posts" :key="post.identifier"/>
</template>
