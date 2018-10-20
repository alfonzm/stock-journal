<template lang="pug">
  div.trades-table
    table.table
      thead
        th Buy T
        th Sell T
        th Symbol
        th Strategy
        th Remarks
        th Avg Buy
        th Avg Sell
        th Buy Amount
        th Sell Amount
        th Profit
        th Change
      tbody
        tr(v-for="trade in trades" :class="{ [tradeResult(trade)]: isTradeComplete(trade) }")
          td {{ getBuyTimestamp(trade.transactions) }}
          td {{ getSellTimestamp(trade.transactions) }}
          td {{ trade.symbol }}
          td {{ trade.strategy }}
          td {{ trade.remarks }}
          td {{ getBuyCount(trade.transactions) }} @ {{ getAverageBuyPrice(trade.transactions) }}
          td
            template(v-if="getAverageSellPrice(trade.transactions) > 0")
              | {{ getSellCount(trade.transactions) }} @ {{ getAverageSellPrice(trade.transactions) }}
          td {{ getTransactionsBuyCost(trade.transactions).toFixed(2) }}
          td {{ getTransactionsSellCost(trade.transactions).toFixed(2) }}
          td {{ getTransactionsProfit(trade.transactions).toFixed(2) }}
          td {{ getTransactionsChange(trade.transactions).toFixed(2) }}
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
    ...Utils
  },
}
</script>

<style scoped lang="sass">
table
  tr.win
    background-color: rgba(lime, 0.08)
  tr.lose
    background-color: rgba(red, 0.08)
  tr.draw
    background-color: rgba(orange, 0.08)
</style>