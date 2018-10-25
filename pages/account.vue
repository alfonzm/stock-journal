<template lang="pug">
  section.section
    h1.title Account Balance
    p Available Cash: {{ currentAvailableCash }}
    p Equity Value: {{ currentEquityValue }}
    button.button(@click="showModal") Add/Withdraw Funds
    fund-transaction-form-modal
</template>

<script>

import Utils from '@/utils/utils'
import FundCalc from '@/utils/fund-calc'
import { mapGetters, mapActions } from 'vuex'

// import FundTransactionsTable from '@/components/presentational/FundTransactionsTable'
import FundTransactionFormModal from '@/components/presentational/FundTransactionFormModal'

export default {
  components: {
    // FundTransactionsTable,
    FundTransactionFormModal,
  },
  mounted() {
    this.retrieveStockPrices()
  },
  computed: {
    ...mapGetters('account', ['availableCash', 'equityValue']),
    currentAvailableCash() {
      return this.availableCash ? this.currencify(this.availableCash, 2) : null
    },
    currentEquityValue() {
      return this.equityValue ? this.currencify(this.equityValue, 2) : null
    },
  },
  methods: {
    ...mapActions('pse', ['retrieveStockPrices', 'getStockData']),
    ...Utils,
    showModal() {
      this.$store.commit('account/SET_SELECTED_FUND_TRANSACTION', null)
      this.$store.dispatch('account/showFundTransactionFormModal')
    },
  }
}
</script>

<style>
</style>