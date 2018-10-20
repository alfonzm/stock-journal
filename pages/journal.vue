<template lang="pug">
  section.section
    h1.title Journal
      button.button.m-l-20(@click="addTrade") Add trade
    trades-table(:trades="trades")
    trade-form-modal(
      :active="isTradeModalActive"
      @submit="onSubmit"
      @close="isTradeModalActive = false")
</template>

<script>

import TradeCalc from '@/utils/trade-calc'
import TradesTable from '@/components/presentational/TradesTable'
import TradeFormModal from '@/components/presentational/TradeFormModal'
import { mapState, mapGetters } from 'vuex'

export default {
  components: { TradesTable, TradeFormModal },
  computed: {
    ...mapGetters(['trades'])
  },
  data() {
    return {
      isTradeModalActive: false
    }
  },
  methods: {
    addTrade() {
      this.isTradeModalActive = true
    },
    onSubmit(trade) {
      this.isTradeModalActive = false
    }
  }
}
</script>

<style>
</style>