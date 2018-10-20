<template lang="pug">
  .modal(:class="{ 'is-active': active }")
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title Add trade
        button.delete(aria-label="close" @click="onCancel")
      section.modal-card-body
        trade-form(@submit="addStock" ref="tradeForm")
      footer.modal-card-foot
        button.button.is-primary.float-right(@click="submit") Add trade plan
        button.button(@click="onCancel") Cancel
</template>

<script>

import { mapActions } from 'vuex'
import TradeForm from '@/components/presentational/TradeForm.vue'

export default {
  components: { TradeForm },
  props: ['active'],
  data() {
    return {
    }
  },
  watch: {
    active(active) {
      if(active) {
        this.onShow()
      } else {
        this.onClose()
      }
    }
  },
  methods: {
    ...mapActions(['addTrade']),
    onShow() {
      this.$refs.tradeForm.onShow()
    },
    onClose() {

    },
    addStock() {

    },
    onCancel() {
      this.$emit('close')
      this.onClose()
    },
    submit() {
      const tradeFormData = this.$refs.tradeForm.getTradeFormData()
      this.addTrade(tradeFormData)
      this.$emit('submit')
      this.$refs.tradeForm.clearFields()
    },
  }
}
</script>

<style lang="sass">
.modal-card
  width: 800px
</style>