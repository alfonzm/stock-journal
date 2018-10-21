<template lang="pug">
  section.section
    h1.title Journal
      button.button.m-l-20(@click="addTrade") Add trade
    trades-table(:trades="trades")
    trade-form-modal(@submit="onSubmit")
</template>

<script>

import TradeCalc from '@/utils/trade-calc'
import TradesTable from '@/components/presentational/TradesTable'
import TradeFormModal from '@/components/presentational/TradeFormModal'
import { mapGetters } from 'vuex'

export default {
  components: { TradesTable, TradeFormModal },
  computed: {
    showTradeFormModal: {
      get() {
        return this.$store.state.journal.showTradeFormModal
      },
      set(value) {
        this.$store.commit('journal/SET_SHOW_TRADE_FORM_MODAL', value)
      }
    },
    ...mapGetters(['trades'])
  },
  methods: {
    addTrade() {
      this.$store.commit('journal/SET_TRADE_FORM_TRADE', null)
      this.$store.dispatch('journal/showTradeFormModal')
    },
    onSubmit(trade) {
      this.showTradeFormModal = false
    }
  }
}
</script>

<style>
</style>