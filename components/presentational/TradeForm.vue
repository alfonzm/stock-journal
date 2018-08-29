<template lang="pug">
  form(@submit.prevent="onSubmit")
    h1.title Add a trade

    h2 Trade
    .field
      input.input(type="text" placeholder="Symbol" v-model="symbol")
    .field
      input.input(type="hidden" value="long" v-model="position")
    .field
      input.input(type="text" placeholder="Remarks" v-model="remarks")
      .control
        label.radio
          input(type="radio" value="simple" v-model="type")
          |  Simple
        label.radio
          input(type="radio" value="complex" v-model="type")
          |  Complex

    br
    
    //- template(v-if="type == 'simple'")
      input.input(type="text" placeholder="Timestamp" v-model="transaction.timestamp")
      input.input(type="number" placeholder="Quantity" v-model="transaction.quantity")
      input.input(type="number" placeholder="Price" v-model="transaction.price")
      | {{ amount(transaction.type, transaction.price, transaction.quantity).toLocaleString(undefined, {minimumFractionDigits: 2}) }}
      a.button(@click="removeTransaction") x

    template
      strong Transactions
      button.button(v-if="type == 'complex'" @click="onClickAddTransaction") Add transaction

      table.table.is-fullwidth
        thead
          th Type
          th Timestamp
          th Quantity
          th Price
          th Amount
          th Remove
        tbody
          tr(v-for="transaction in transactions")
            td
              .control
                label.radio
                  input(type="radio" value="buy" v-model="transaction.type")
                  |  Buy
                label.radio
                  input(type="radio" value="sell" v-model="transaction.type")
                  |  Sell
            td
              input.input(type="text" placeholder="Timestamp" v-model="transaction.timestamp")
            td
              input.input(type="number" placeholder="Quantity" v-model="transaction.quantity")
            td
              input.input(type="number" placeholder="Price" v-model="transaction.price")
            td {{ amount(transaction.type, transaction.price, transaction.quantity).toLocaleString(undefined, {minimumFractionDigits: 2}) }}
            td
              a.button(@click="removeTransaction") x

    .field
      input.button.is-primary(type="submit" value="Save trade")
</template>

<script>

import TradeCalc from '@/utils/trade-calc'

export default {
  mounted() {
    this.onUpdateType(this.type)
  },
  watch: {
    type(type) {
      this.onUpdateType(type)
    }
  },
  data() {
    return {
      // type (simple = 1 buy and 1 sell only. complex = many diff buy/sell prices)
      type: 'complex',

      // Trade
      symbol: null,
      position: 'long',
      remarks: null,
      transactions: [],

      // Empty transaction template
      emptyTransaction: {
        quantity: null,
        type: 'buy',
        price: null,
        timestamp: null,
      },
    }
  },
  computed: {
    riskRewardRatio() {
      return TradeCalc.getPrettyRiskRewardRatio(this.entryPrice, this.stopLossPrice, this.exitPrice)
    },
    profit() {
      return TradeCalc.getProfit(this.entryPrice, this.exitPrice, this.quantity)
    },
  },
  methods: {
    onUpdateType(type) {
      if(type == 'simple') {
        this.transactions = []
        this.addNewTransaction({ type: 'buy' })
        this.addNewTransaction({ type: 'sell' })
      } else if (type == 'complex') {
        this.transactions = []
        this.addNewTransaction()
      }
    },
    onClickAddTransaction() {
      if(this.type == 'complex') {
        this.addNewTransaction()
      }
    },
    addNewTransaction(initialData = {}) {
      const newTransaction = Object.assign({}, this.emptyTransaction)
      this.transactions.push(Object.assign(newTransaction, initialData))
    },
    amount(type, price, quantity) {
      return TradeCalc.getAmount(type, price, quantity)
    },
    onSubmit() {
      this.$emit('submit', { 
        symbol: this.symbol,
        position: this.position,
        remarks: this.remarks,
        transactions: this.transactions,
      })
    },
    addTransaction() {
      
    },
    removeTransaction() {
      
    },
  }
}
</script>

<style>
</style>