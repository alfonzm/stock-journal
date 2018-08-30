<template lang="pug">
  div
    .container.is-fluid
      h1.title Journal
      trades-table(:trades="trades")
</template>

<script>

import TradeCalc from '@/utils/trade-calc'
import TradesTable from '@/components/presentational/TradesTable'
import { mapState } from 'vuex'

export default {
  components: { TradesTable },
  computed: mapState([
    'trades',
  ]),
}
</script>

<style>
</style>