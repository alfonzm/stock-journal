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
          td {{ tradeCalc().getBuyTimestamp(trade.transactions) }}
          td {{ tradeCalc().getSellTimestamp(trade.transactions) }}
          td {{ trade.symbol }}
          td {{ trade.remarks }}
          td {{ tradeCalc().getBuyCount(trade.transactions) }} @ {{ tradeCalc().getAverageBuyPrice(trade.transactions) }}
          td {{ tradeCalc().getSellCount(trade.transactions) }} @ {{ tradeCalc().getAverageSellPrice(trade.transactions) }}
          td {{ tradeCalc().getTransactionsBuyCost(trade.transactions) }}
          td {{ tradeCalc().getTransactionsSellCost(trade.transactions) }}
          td {{ tradeCalc().getTransactionsProfit(trade.transactions) }}
          td {{ tradeCalc().getTransactionsChange(trade.transactions) }}
</template>

<script>
import TradeCalc from '@/utils/trade-calc'

export default {
  props: [
    'trades', // array of Trade
  ],
  methods: {
    tradeCalc() {
      return TradeCalc
    }
  }
}
</script>