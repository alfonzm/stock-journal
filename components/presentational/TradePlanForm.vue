<template lang="pug">
  form(@submit.prevent="onSubmit")
    .field.is-horizontal
      .field-body
        .field
          label.label.is-small Symbol
          .control
            input.input.is-normal.is-uppercase(type="text" placeholder="Symbol" v-model="symbol" ref="symbolInput")
        .field
          label.label.is-small Quantity
          .control
            input.input(type="number" placeholder="Quantity" v-model="quantity")
    .field.is-horizontal
      .field-body
        .field
          label.label.is-small Entry Price
          .control
            input.input(type="number" placeholder="Entry Price" v-model="entryPrice")
          p.help
            | Net buy: {{ buyCost }}
        .field
          label.label.is-small Target Price
          .control
            input.input(type="number" placeholder="Exit Price" v-model="exitPrice")
          p.help
            | Net sell: {{ sellCost }}
    .field.is-horizontal
      .field-body
        .field
          label.label.is-small Stop Loss
          .control
            input.input(type="number" placeholder="Stop Loss" v-model="stopLossPrice")
        .field
          label.label.is-small Trailing Stop
          .control
            input.input(type="number" placeholder="Trailing Stop" v-model="trailingStop")

    .field
      label.label.is-small Remarks
      textarea.textarea(rows="2" v-model="remarks")
    .field
      label.label.is-small Strategy
      input.input(type="text" v-model="strategy")

    .columns
      .column
        //- p
          strong Net Profit: 
          strong
            span {{ profit }} 
        p
          strong Net Profit: 
          strong
            p(:class="changePercentage > 0 ? 'text-green' : changePercentage < 0 ? 'text-red' : 'text-gray'") {{ profit}} ({{ changePercentage }}%)
      .column
        p
          strong Stop Loss Loss: 
          strong
            p(:class="stopLossPercentage > 0 ? 'text-green' : stopLossPercentage < 0 ? 'text-red' : 'text-gray'") {{ stopLossNet }} ({{ stopLossPercentage }}%)
    .columns
      .column
        p
          strong Risk/Reward Ratio: 
          span {{ riskRewardRatio }}
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
      strategy: null,
    }
  },
  computed: {
    riskRewardRatio() {
      return TradeCalc.getPrettyRiskRewardRatio(this.entryPrice, this.stopLossPrice, this.exitPrice)
    },
    changePercentage() {
      const buyCost = TradeCalc.getBuyCost(this.entryPrice, this.quantity)
      const profit = TradeCalc.getProfit(this.entryPrice, this.exitPrice, this.quantity)
      return TradeCalc.getChangePercent(profit, buyCost)
    },
    stopLossPercentage() {
      const buyCost = TradeCalc.getBuyCost(this.entryPrice, this.quantity)
      const stopLossNet = TradeCalc.getProfit(this.entryPrice, this.stopLossPrice, this.quantity)
      return TradeCalc.getChangePercent(stopLossNet, buyCost)
    },
    stopLossNet() {
      return TradeCalc.getProfit(this.entryPrice, this.stopLossPrice, this.quantity).toLocaleString(undefined, { maximumFractionDigits: 2})
    },
    buyCost() {
      return TradeCalc.getBuyCost(this.entryPrice, this.quantity).toLocaleString(undefined, { maximumFractionDigits: 2 })
    },
    sellCost() {
      return TradeCalc.getSellCost(this.exitPrice, this.quantity).toLocaleString(undefined, { maximumFractionDigits: 2 })
    },
    profit() {
      return TradeCalc.getProfit(this.entryPrice, this.exitPrice, this.quantity).toLocaleString(undefined, { maximumFractionDigits: 2 })
    },
    stats() {
      return TradeCalc.getTradePlanStats({
        quantity: this.quantity,
        entryPrice: this.entryPrice,
        exitPrice: this.exitPrice,
        stopLossPrice: this.stopLossPrice,
        trailingStop: this.trailingStop,
      })
    }
  },
  methods: {
    onShow() {
      setTimeout(
        () => {
          this.$refs.symbolInput.focus()
        },
        100
      )
    },
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