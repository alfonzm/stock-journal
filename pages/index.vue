<template lang="pug">
  div
    form.my-stock-form(@submit.prevent="addStock")
      input(type="text" placeholder="Symbol")
      input(type="number" placeholder="Buy Price")
      input(type="submit")
    ul
      li(v-for="myStock in myStocks") {{ myStock.symbol }} {{ myStock.buyPrice }}
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState([
    'myStocks'
  ]),
  methods: {
    ...mapActions(['addMyStock']),
    addStock() {
      this.addMyStock({ symbol: 'NOW', buyPrice: 13 })
    }
  }
}
</script>

<style>
</style>
