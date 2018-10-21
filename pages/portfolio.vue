<template lang="pug">
  section.section
    h1.title Portfolio
    pre {{ trades }}
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['trades'])
  }
}
</script>

<style>
</style>