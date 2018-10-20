<template lang="pug">
  form(@submit.prevent="onSubmit")
    .field
      label.label.is-size-7 Symbol
      input.input(type="text" placeholder="Symbol" v-model="symbol" ref="symbolInput")
    .field
      input.input(type="hidden" value="long" v-model="position")
    .columns
      .column
        .field
          label.label.is-small Strategy
          input.input(v-model="strategy")
      .column
        .field
          label.label.is-small Remarks
          input.input(v-model="remarks")
    .field
      //- label.label.is-small Transactions
      .tabs
        ul
          li(:class="{ 'is-active' : type == 'simple' }" @click="type = 'simple'")
            strong
              a Single
          li(:class="{ 'is-active' : type == 'complex' }" @click="type = 'complex'")
            strong 
              a Multiple
    //- .field
      .control
        label.radio
          input(type="radio" value="simple" v-model="type")
          |  Single
        label.radio
          input(type="radio" value="complex" v-model="type")
          |  Multiple
    
    //- template(v-if="type == 'simple'")
      input.input(type="text" placeholder="Timestamp" v-model="transaction.timestamp")
      input.input(type="number" placeholder="Quantity" v-model="transaction.quantity")
      input.input(type="number" placeholder="Price" v-model="transaction.price")
      | {{ amount(transaction.type, transaction.price, transaction.quantity).toLocaleString(undefined, {minimumFractionDigits: 2}) }}
      a.button(@click="removeTransaction") x

    //- Single Trade
    template(v-if="type == 'simple'")
      .field.is-horizontal
        .field-body
          .field
            label.label.is-small Timestamp
            .control
              input.input(type="number" placeholder="Timestamp" v-model="singleTradeTimestamp")
          .field
            label.label.is-small Quantity
            .control
              input.input(type="number" placeholder="Quantity" v-model="singleTradeQuantity")
      .field.is-horizontal
        .field-body
          .field
            label.label.is-small Buy Price
            .control
              input.input(type="number" placeholder="Buy Price" v-model="singleTradeEntryPrice")
            //- p.help
              | Net buy: {{ buyCost }}
          .field
            label.label.is-small Sell Price
            .control
              input.input(type="number" placeholder="Sell Price" v-model="singleTradeExitPrice")
            //- p.help
              | Net sell: {{ sellCost }}
      
    //- Multiple Trades
    template(v-else)
      table.table
        thead
          th.is-size-7 Timestamp
          th.is-size-7 Type
          th.is-size-7 Quantity
          th.is-size-7 Price
          th.is-size-7
        tbody
          tr(v-for="transaction in transactions")
            td
              input.input(type="text" placeholder="Timestamp" v-model="transaction.timestamp")
            td
              .control
                .select
                  select
                    option Buy
                    option Sell
            td
              input.input(type="number" placeholder="Quantity" v-model="transaction.quantity")
            td
              input.input(type="number" placeholder="Price" v-model="transaction.price")
            //- td {{ amount(transaction.type, transaction.price, transaction.quantity).toLocaleString(undefined, {minimumFractionDigits: 2}) }}
            td
              a.button.is-white(@click="removeTransaction")
                span.icon
                  i.fa.fa-times.fa-lg
      .field
        button.button(@click.prevent="onClickAddTransaction")
          span Add transaction +
    //- .field
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
      // Trade Type (simple = 1 buy and 1 sell only. complex = many diff buy/sell prices)
      type: 'simple',

      // Trade
      symbol: null,
      position: 'long',
      remarks: null,
      strategy: null,
      transactions: [],

      // Single transaction
      singleTradeTimestamp: null,
      singleTradeQuantity: null,
      singleTradeEntryPrice: null,
      singleTradeExitPrice: null,

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
    onShow() {
      setTimeout(
        () => {
          this.$refs.symbolInput.focus()
        },
        100
      )
    },
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
      this.$emit('submit', this.getTradeFormData())
      this.clearFields()
    },
    getTradeFormData() {
      if (this.type == 'simple') {
        this.transactions = [
          {
            quantity: this.singleTradeQuantity,
            type: 'buy',
            price: this.singleTradeEntryPrice,
            timestamp: this.singleTradeTimestamp,
          },
          {
            quantity: this.singleTradeQuantity,
            type: 'sell',
            price: this.singleTradeExitPrice,
            timestamp: this.singleTradeTimestamp,
          },
        ]
      }

      return Object.assign({}, {
        symbol: this.symbol,
        position: this.position,
        remarks: this.remarks,
        strategy: this.strategy,
        transactions: this.transactions,
      })
    },
    clearFields() {
      this.symbol = null
      this.remarks = null
      this.strategy = null

      this.singleTradeTimestamp = null
      this.singleTradeQuantity = null
      this.singleTradeEntryPrice = null
      this.singleTradeExitPrice = null

      this.transactions = []
    },
    addTransaction() {
      
    },
    removeTransaction() {
      
    },
  }
}
</script>

<style lang="sass">
.table.is-compact
  td
    padding: 0
</style>