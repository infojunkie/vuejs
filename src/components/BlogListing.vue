<script>
import BlogPost from './BlogPost.vue'

export default {
  components: {
    BlogPost
  },
  name: 'BlogListing',
  props: {
    useComponent: String,
    posts: Object
  }
}
</script>

<template>
  <div class="row" data-dot="row" v-for="post in posts" >
    <div class="col-start-4 col-end-9 mt-7" data-dot="column">
      <BlogPost v-bind="post" :key="post.identifier"/>
    </div>
  </div>
</template>
