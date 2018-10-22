<template lang="pug">
  span.has-text-weight-bold(:class="`text-${greenOrRed(value)}`")
    | {{ currencify(value, decimalPlaces || 2) }}
    slot
</template>

<script>
import Utils from '@/utils/utils'

export default {
  props: {
    value: Number,
    decimalPlaces: Number
  },
  methods: {
    currencify: Utils.currencify,
    greenOrRed: Utils.greenOrRed,
  }
}
</script>