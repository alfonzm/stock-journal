<template lang="pug">
  .tabs
    ul
      li(v-for="route in routes" :class="{'is-active':($route.name === route.url)}")
        nuxt-link(:to="route.url") {{ route.name }}
</template>

<script>

export default {
  data() {
    return {
      routes: [
        { url: 'dashboard', name: 'Dashboard' },
        { url: 'journal', name: 'Journal' },
        { url: 'add-trade', name: 'Add Trade' },
        { url: 'add-trade-plan', name: 'Add Trade Plan' },
        { url: 'plans', name: 'Plans' },
        { url: 'calculator', name: 'Calculator' },
      ]
    }
  }
}
</script>

<style>
</style>
