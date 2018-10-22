<template lang="pug">
  section.section
    h1.title Portfolio
    portfolio-table(:stocks="stocks")
</template>

<script>

import _ from 'lodash'
import { mapGetters } from 'vuex'
import PortfolioTable from '@/components/presentational/PortfolioTable'

export default {
  components: {
    PortfolioTable
  },
  computed: {
    ...mapGetters({
      stocks: 'portfolioStocks'
    }),
  }
}
</script>

<style>
</style>