<template lang="pug">
  div
    .section
      h1.title Plans
        button.button.m-l-20(@click="addPlan") Add plan
      trades-table(:trades="trades")
      trade-plan-form-modal(
        :active="isTradePlanModalActive"
        @submit="onSubmit"
        @close="isTradePlanModalActive = false")
</template>

<script>

import TradeCalc from '@/utils/trade-calc'
import TradesTable from '@/components/presentational/TradesTable'
import TradePlanFormModal from '@/components/presentational/TradePlanFormModal'
import { mapGetters } from 'vuex'

export default {
  components: { TradesTable, TradePlanFormModal },
  computed: {
    ...mapGetters(['trades'])
  },
  data() {
    return {
      isTradePlanModalActive: false
    }
  },
  methods: {
    onSubmit() {
    },
    addPlan() {
      this.isTradePlanModalActive = true
    },
  }
}
</script>

<style>
</style>