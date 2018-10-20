<template lang="pug">
  .modal(:class="{ 'is-active': active }")
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title Add trade
        button.delete(aria-label="close" @click="onCancel")
      section.modal-card-body
        trade-form(ref="tradeForm")
      footer.modal-card-foot
        button.button.is-primary.float-right(@click="submit")
          template(v-if="trade && trade.id")
            | Save trade
          template(v-else)
            | Add trade
        button.button(@click="onCancel") Cancel
</template>

<script>

import { mapState, mapActions } from 'vuex'
import TradeForm from '@/components/presentational/TradeForm.vue'

export default {
  components: { TradeForm },
  props: {
    active: Boolean
  },
  watch: {
    active(active) {
      if(active) {
        this.onShow()
      }
    }
  },
  computed: {
    ...mapState('journal', {
      trade: state => state.tradeFormTrade
    }),
  },
  methods: {
    ...mapActions(['addTrade', 'updateTrade']),
    onShow() {
      this.$refs.tradeForm.onShow()
    },
    onCancel() {
      this.$emit('close')
    },
    submit() {
      const tradeFormData = this.$refs.tradeForm.getTradeFormData()
      if(tradeFormData.id) {
        this.updateTrade(tradeFormData)
      } else {
        this.addTrade(tradeFormData)
      }
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