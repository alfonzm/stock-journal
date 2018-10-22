<template lang="pug">
  div.portfolio-table
    table.table
      thead
        th Stock
        th Quantity
        th Market Price
        th Avg. Buy Price
        th Total Cost
        th Market Value
        th Profit/Loss
        th Change
      tbody
        tr(v-for="transactions, symbol in stocks")
          td.is-uppercase.has-text-weight-bold {{ symbol }}
          td {{ getRemainingQuantity(transactions) }}
          td {{ marketPrice(symbol) ? currencify(marketPrice(symbol), 4) : null }}
          td {{ currencify(getAverageBuyPrice(transactions), 4) }}
          td {{ currencify(getRemainingBuyCost(transactions), 2) }}
          //- td {{ currencify(totalCost(transactions), 2) }}
          td {{ marketValue(transactions, symbol) ? currencify(marketValue(transactions, symbol), 2) : null }}
          td
            green-red-text(:value="profitLoss(transactions, symbol)")
          td 
            green-red-text(:value="change(transactions, symbol)") %
    span.is-size-7.is-italic Market prices as of: {{ lastUpdated }}
</template>
<script>
import _ from 'lodash'
import moment from 'moment'
import Utils from '@/utils/utils'
import TradeCalc from '@/utils/trade-calc'
import GreenRedText from '@/components/presentational/GreenRedText'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  props: {
    stocks: Object // stocks in user's portfolio (has transactions)
  },
  mounted() {
    this.retrieveStockPrices()
  },
  components: {
    GreenRedText
  },
  computed: {
    ...mapState('pse', {
      pseStocks: 'stocks',
      timestamp: 'timestamp'
    }),
    ...mapGetters('pse', ['getStockPrice']),
    lastUpdated() {
      return this.timestamp ? moment(this.timestamp).format('MMM DD, YYYY hh:mm:ss a') : ''
    },
  },
  methods: {
    ...TradeCalc,
    ...Utils,
    ...mapActions('pse', ['retrieveStockPrices', 'getStockData']),
    // totalCost(transactions) {
    //   return this.getBuyCost(this.marketPrice(symbol), this.getRemainingQuantity(transactions))
    // },
    marketPrice(symbol) {
      return this.getStockPrice(symbol)
    },
    marketValue(transactions, symbol) {
      return this.getSellCost(this.marketPrice(symbol), this.getRemainingQuantity(transactions))
    },
    profitLoss(transactions, symbol) {
      const totalBuyPrice = this.getRemainingBuyCost(transactions)
      const marketPrice = this.marketValue(transactions, symbol)
      return totalBuyPrice > 0 && marketPrice > 0 ? marketPrice - totalBuyPrice : 0
    },
    change(transactions, symbol) {
      return this.getChangePercent(this.profitLoss(transactions, symbol), this.getTransactionsBuyCost(transactions))
    },
  },
}
</script>

<style scoped lang="sass">
.portfolio-table table
  font-size: 0.9rem
  width: 100%

  tr
    &:hover
      background-color: rgba(gray, 0.05)
</style>