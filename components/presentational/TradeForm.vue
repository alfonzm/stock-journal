<template lang="pug">
  form.trade-form(@submit.prevent="onSubmit")
    .field
      label.label.is-size-7 Stock Code
      input.is-uppercase.input(type="text" v-model="symbol" ref="symbolInput")
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
    //- .field
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
          tr(v-for="(transaction, index) in transactions")
            td
              input.input(type="text" placeholder="Timestamp" v-model="transaction.timestamp")
            td
              .control
                .select
                  select(v-model="transaction.type")
                    option(value="buy") Buy
                    option(value="sell") Sell
            td
              input.input(type="number" placeholder="Quantity" v-model="transaction.quantity")
            td
              input.input(type="number" placeholder="Price" v-model="transaction.price")
            //- td {{ amount(transaction.type, transaction.price, transaction.quantity).toLocaleString(undefined, {minimumFractionDigits: 2}) }}
            td
              a.button.is-white(@click="removeTransaction(index)")
                span.icon
                  i.fa.fa-times.fa-lg
          tr
            td
              .field
                button.button.is-rounded.is-small(@click.prevent="onClickAddTransaction" type="button")
                  span Add transaction +
    //- .field
      input.button.is-primary(type="submit" value="Save trade")
</template>

<script>
import { mapState } from 'vuex'
import TradeCalc from '@/utils/trade-calc'

export default {
  // mounted() {
  //   this.onUpdateType(this.type)
  // },
  // watch: {
  //   type(type) {
  //     this.onUpdateType(type)
  //   }
  // },
  data() {
    return {
      // Trade Type (simple = 1 buy and 1 sell only. complex = many diff buy/sell prices)
      type: 'complex',

      // Trade
      id: null,
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
    ...mapState('journal', {
      tradeFromState: state => state.tradeFormTrade
    }),
    riskRewardRatio() {
      return TradeCalc.getPrettyRiskRewardRatio(this.entryPrice, this.stopLossPrice, this.exitPrice)
    },
    profit() {
      return TradeCalc.getProfit(this.entryPrice, this.exitPrice, this.quantity)
    },
  },
  methods: {
    onShow() {
      setTimeout(() => this.$refs.symbolInput.focus(), 100)
      this.copyTradeToData(this.tradeFromState)
    },
    copyTradeToData(trade) {
      if(!trade) {
        // this.type = 'complex'
        this.clearFields()
      } else {
        // this.type = 'complex'
        this.id = trade.id
        this.symbol = trade.symbol
        this.position = trade.position
        this.remarks = trade.remarks
        this.strategy = trade.strategy
        this.transactions = trade.transactions.slice()
      }
    },
    // onUpdateType(type) {
    //   if(this.transactions.length > 0) {
    //     return
    //   }

    //   if(type == 'simple') {
    //     this.transactions = []
    //     this.addNewTransaction({ type: 'buy' })
    //     this.addNewTransaction({ type: 'sell' })
    //   } else if (type == 'complex') {
    //     this.transactions = []
    //     this.addNewTransaction()
    //   }
    // },
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
            quantity: this.singleTradeExitPrice ? this.singleTradeQuantity : null,
            type: 'sell',
            price: this.singleTradeExitPrice,
            timestamp: this.singleTradeTimestamp,
          },
        ]
      }

      return Object.assign({}, {
        id: this.id,
        symbol: this.symbol,
        position: this.position,
        remarks: this.remarks,
        strategy: this.strategy,
        transactions: this.transactions,
      })
    },
    clearFields() {
      this.id = null
      this.symbol = null
      this.remarks = null
      this.strategy = null

      this.singleTradeTimestamp = null
      this.singleTradeQuantity = null
      this.singleTradeEntryPrice = null
      this.singleTradeExitPrice = null

      this.transactions = []
      this.addNewTransaction({ type: 'buy' })
      this.addNewTransaction({ type: 'sell' })
    },
    removeTransaction(index) {
      this.transactions.splice(index, 1)
    },
  }
}
</script>

<style lang="sass">
.trade-form
  .table
    width: 100%

    thead th
      border-width: 0 0 1px

    tr td
      border: none

    &.is-compact
      td
        padding: 0
</style>