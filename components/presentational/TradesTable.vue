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
            //- | {{ getBuyCount(trade.transactions) }} @ {{ getAverageBuyPrice(trade.transactions) }}
            | {{ currencify(getAverageBuyPrice(trade.transactions), 2) }} ({{ commafy(getBuyCount(trade.transactions)) }})
          td
            template(v-if="getAverageSellPrice(trade.transactions) > 0")
              //- | {{ getSellCount(trade.transactions) }} @ {{ getAverageSellPrice(trade.transactions) }}
              | {{ currencify(getAverageSellPrice(trade.transactions), 2) }} ({{ commafy(getSellCount(trade.transactions)) }})
          td {{ currencify(getTransactionsBuyCost(trade.transactions), 2) }}
          td {{ currencify(getTransactionsSellCost(trade.transactions), 2) }}
          td.has-text-weight-bold(:class="`text-${greenOrRed(profit(trade))}`") {{ currencify(profit(trade), 2) }}
          td.has-text-weight-bold(:class="`text-${greenOrRed(profit(trade))}`") {{ getTransactionsChange(trade.transactions).toFixed(2) }}%
</template>

<script>
import Utils from '@/utils/utils'
import TradeCalc from '@/utils/trade-calc'

export default {
  props: [
    'trades', // array of Trade
  ],
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