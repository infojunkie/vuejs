<script>
import FallbackComponent from './FallbackComponent.vue'

export default {
  components: {
    FallbackComponent
  },
  name: 'VtlInclude',
  props: {
    title: String,
    widgetCodeJSON: Object
  },
  methods: {
    getComponent(widgetCodeJSON) {
      const componentName = widgetCodeJSON.useComponent
      const isComponentRegistered = this.$registeredComponents.includes(componentName)
      return isComponentRegistered ? componentName : 'FallbackComponent'
    }
  }
}
</script>

<template>
  <div v-if="widgetCodeJSON?.useComponent">
    <component v-bind="widgetCodeJSON" :is="getComponent(widgetCodeJSON)"></component>
  </div>
  <div v-else class="p-4 border border-red-500">{{ title }}</div>
</template>
