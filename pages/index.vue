<template lang="pug">
  div
    navbar
    //- trade-plan-form(@submit="addStock")
    .container.is-fluid
      journal
      //- trade-form(@submit="addStock")
      //- ul
        li(v-for="tradePlan in tradePlans") {{ tradePlan.symbol }} {{ tradePlan.buyPrice }}
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import TradePlanForm from '@/components/presentational/TradePlanForm.vue'
import TradeForm from '@/components/presentational/TradeForm.vue'
import Journal from '@/components/Journal.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: { Navbar, TradePlanForm, TradeForm, Journal },
  computed: mapState([
    'tradePlans',
  ]),
  methods: {
    ...mapActions(['addtradePlan']),
    addStock(tradePlanToAdd) {
      console.log(tradePlanToAdd)
      // this.addtradePlan(tradePlanToAdd)
    }
  }
}
</script>

<style>
</style>
