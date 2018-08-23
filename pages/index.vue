<template lang="pug">
  div
    navbar
    trade-plan-form(@submit="addStock")
    ul
      li(v-for="tradePlan in tradePlans") {{ tradePlan.symbol }} {{ tradePlan.buyPrice }}
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import TradePlanForm from '@/components/TradePlanForm.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: { Navbar, TradePlanForm },
  computed: mapState([
    'tradePlans'
  ]),
  methods: {
    ...mapActions(['addtradePlan']),
    addStock(tradePlanToAdd) {
      this.addtradePlan(tradePlanToAdd)
    }
  }
}
</script>

<style>
</style>
