<template lang="pug">
  div
    table.table
      thead
        th Buy T
        th Sell T
        th Symbol
        th Remarks
        th Buy
        th Sell
        th Buy Amount
        th Sell Amount
        th Profit
        th Change
      tbody
        tr(v-for="trade in trades")
          td {{ getBuyTimestamp(trade.transactions) }}
          td {{ getSellTimestamp(trade.transactions) }}
          td {{ trade.symbol }}
          td {{ trade.remarks }}
          td {{ getBuyCount(trade.transactions) }} @ {{ getAverageBuyPrice(trade.transactions) }}
          td {{ getSellCount(trade.transactions) }} @ {{ getAverageSellPrice(trade.transactions) }}
          td {{ getTransactionsBuyCost(trade.transactions).toFixed(2) }}
          td {{ getTransactionsSellCost(trade.transactions).toFixed(2) }}
          td {{ getTransactionsProfit(trade.transactions).toFixed(2) }}
          td {{ getTransactionsChange(trade.transactions).toFixed(2) }}
</template>

<script>
import TradeCalc from '@/utils/trade-calc'

export default {
  props: [
    'trades', // array of Trade
  ],
  methods: {
    ...TradeCalc
  }
}
</script>