<template lang="pug">
  div.trades-table
    table.table
      thead
        th Timestamp
        th Stock
        th Strategy
        th Remarks
        th Avg Buy
        th Avg Sell
        th Buy Amount
        th Sell Amount
        th Profit
        th Change
      tbody
        tr(v-for="trade in trades" :class="{ [tradeResult(trade)]: isTradeComplete(trade) }" @click="editTrade(trade)")
          td
            | {{ getBuyTimestamp(trade.transactions) }}
            template(v-if="getSellTimestamp(trade.transactions)")
              | &nbsp;- {{ getSellTimestamp(trade.transactions) }}
          td.is-uppercase {{ trade.symbol }}
          td {{ trade.strategy }}
          td {{ trade.remarks }}
          td
            template(v-if="getAverageBuyPrice(trade.transactions) > 0")
              | {{ currencify(getAverageBuyPrice(trade.transactions), 4) }} ({{ commafy(getTotalBuyQuantity(trade.transactions)) }})
          td
            template(v-if="getAverageSellPrice(trade.transactions) > 0 && isTradeComplete(trade)")
              | {{ currencify(getAverageSellPrice(trade.transactions), 4) }} ({{ commafy(getTotalSellQuantity(trade.transactions)) }})
          td {{ currencify(getTransactionsBuyCost(trade.transactions), 2) }}
          td
            template(v-if="isTradeComplete(trade)")
              | {{ currencify(getTransactionsSellCost(trade.transactions), 2) }}
          td
            green-red-text(:value="profit(trade)")
          td
            green-red-text(:value="getTransactionsChange(trade.transactions).toFixed(2)")
              | %
</template>

<script>
import Utils from '@/utils/utils'
import TradeCalc from '@/utils/trade-calc'
import GreenRedText from '@/components/presentational/GreenRedText'

export default {
  props: [
    'trades', // array of Trade
  ],
  components: {
    GreenRedText
  },
  methods: {
    ...TradeCalc,
    ...Utils,
    editTrade(trade) {
      this.$store.dispatch('journal/showTradeFormModal', trade)
    },
    profit(trade) {
      return this.getTransactionsProfit(trade.transactions)
    }
  },
}
</script>

<style scoped lang="sass">
.trades-table table
  font-size: 0.9rem
  width: 100%

  tr
    &:hover
      cursor: pointer
      background-color: rgba(gray, 0.1)

    &.win
      background-color: rgba(lime, 0.05)
      &:hover
        background-color: rgba(lime, 0.16)

    &.lose
      background-color: rgba(red, 0.05)
      &:hover
        background-color: rgba(red, 0.16)

    &.draw
      background-color: rgba(orange, 0.05)
      &:hover
        background-color: rgba(orange, 0.16)
</style>