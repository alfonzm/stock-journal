<template lang="pug">
  .section
    trade-plan-form(@submit="addStock")
</template>

<script>
import TradePlanForm from '@/components/presentational/TradePlanForm.vue'

export default {
  components: { TradePlanForm },
  methods: {
    addStock(tradePlanToAdd) {
      console.log(tradePlanToAdd)
      // this.addtradePlan(tradePlanToAdd)
    }
  }
}
</script>

<style>
</style>
