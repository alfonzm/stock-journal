<template lang="pug">
  form(@submit.prevent="onSubmit")
    h1.title Add a trade plan
    //- .field.is-horizontal
    //-   .field-label.is-normal
    //-     label.label Symbol
    //-   .field-body
    //-     .field
    //-       .control
    //-         input.input(type="text" placeholder="Symbol" v-model="symbol")

    .field
      input.input(type="text" placeholder="Symbol" v-model="symbol")
      input.input(type="number" placeholder="Quantity" v-model="quantity")
      input.input(type="number" placeholder="Entry Price" v-model="entryPrice")
      input.input(type="number" placeholder="Exit Price" v-model="exitPrice")
      input.input(type="number" placeholder="Stop Loss" v-model="stopLossPrice")
      input.input(type="number" placeholder="Trailing Stop" v-model="trailingStop")
      input.input(type="text" placeholder="Remarks" v-model="remarks")
      input.input(type="text" placeholder="Strategy" v-model="strategy")
    .field Risk/Reward Ratio {{ riskRewardRatio }}
    .field Change {{ changePercentage }}%
    .field Buy Cost {{ buyCost.toLocaleString(undefined, {minimumFractionDigits: 2}) }}
    .field Profit {{ profit.toLocaleString(undefined, {minimumFractionDigits: 2}) }}
    .field
      input.button.is-primary(type="submit")
</template>

<script>

import TradeCalc from '@/utils/trade-calc'

export default {
  data() {
    return {
      symbol: null,
      quantity: null,
      entryPrice: null,
      exitPrice: null,
      stopLossPrice: null,
      trailingStop: null,
      remarks: null,
      strategy: null
    }
  },
  computed: {
    riskRewardRatio() {
      return TradeCalc.getPrettyRiskRewardRatio(this.entryPrice, this.stopLossPrice, this.exitPrice)
    },
    changePercentage() {
      return TradeCalc.getChangePercent(this.profit, this.buyCost)
    },
    buyCost() {
      return TradeCalc.getBuyCost(this.entryPrice, this.quantity)
    },
    profit() {
      return TradeCalc.getProfit(this.entryPrice, this.exitPrice, this.quantity)
    },
  },
  methods: {
    onSubmit() {
      this.$emit('submit', { 
        symbol: this.symbol,
        buyPrice:this.buyPrice
      })
    }
  }
}
</script>

<style>
</style>