<template lang="pug">
  form.fund-transaction-form
    .field
      label.label.is-size-7 Date
      input.input(type="text" v-model="date")
    .field  
      label.label.is-size-7 Type
      .control
        .select
          select(v-model="type")
            option(value="deposit") Deposit
            option(value="withdraw") Withdraw
            option(value="dividends") Dividends
    .field
      label.label.is-size-7 Amount
      input.input(type="number" v-model="amount")
    .field
      label.label.is-size-7 Fees
      input.input(type="number" v-model="fees")
    span.is-size-7.has-text-weight-bold Net total
    p {{ net }}
</template>

<script>
import Utils from '@/utils/utils'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      id: null,
      date: null,
      type: 'deposit',
      amount: null,
      fees: null,
    }
  },
  computed: {
    net() {
      return Utils.currencify(this.amount - this.fees, 2)
    }
  },
  methods: {
    // onSubmit() {
    //   this.$emit('submit', this.getFormData())
    //   this.clearFields()
    // },
    getFormData() {
      return {
        id: Number(this.id),
        date: this.date,
        type: this.type,
        amount: Number(this.amount),
        fees: Number(this.fees)
      }
    },
    clearFields() {
      this.id = null
      this.date = null
      this.type = 'deposit'
      this.amount = null
      this.fees = null
    },
  }
}
</script>

<style lang="sass">
.select, .select select
  width: 100%
</style>