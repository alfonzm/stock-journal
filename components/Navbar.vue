<template lang="pug">
  .navbar.has-shadow
    .navbar-brand
      a.navbar-item
        strong IPIT.PH
    .navbar-menu
      .navbar-start
        template(v-for="route in routes")
          nuxt-link.navbar-item(:class="{'is-active':($route.name === route.url)}" :to="route.url") {{ route.name }}
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
