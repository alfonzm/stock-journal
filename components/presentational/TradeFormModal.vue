<template lang="pug">
  .modal(:class="{ 'is-active': showTradeFormModal }")
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title Add trade
        button.delete(aria-label="close" @click="onCancel")
      section.modal-card-body
        trade-form(ref="tradeForm")
      footer.modal-card-foot
        button.button.is-primary(@click="submit")
          template(v-if="selectedTrade && selectedTrade.id")
            | Save trade
          template(v-else)
            | Add trade
        button.button(@click="onCancel") Cancel

        button.button.is-danger.is-outlined.is-pulled-right(@click="onDelete(selectedTrade)") Delete trade
</template>

<script>

import { mapState, mapActions } from 'vuex'
import TradeForm from '@/components/presentational/TradeForm.vue'

// Events:
// close = called on closing the modal
// submit = called on submitting the modal (Add trade or Save)
export default {
  components: { TradeForm },
  watch: {
    showTradeFormModal(show) {
      if(show) {
        this.onShow()
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if(this.showTradeFormModal && e.key == 'Escape') {
        this.showTradeFormModal = false
      }
    })
  },
  computed: {
    ...mapState('journal', {
      selectedTrade: state => state.tradeFormTrade
    }),
    showTradeFormModal: {
      get() {
        return this.$store.state.journal.showTradeFormModal
      },
      set(value) {
        this.$store.commit('journal/SET_SHOW_TRADE_FORM_MODAL', value)
      }
    },
  },
  methods: {
    ...mapActions(['addTrade', 'updateTrade', 'deleteTrade']),
    onShow() {
      this.$refs.tradeForm.onShow()
    },
    onCancel() {
      this.showTradeFormModal = false
      this.$emit('close')
    },
    onDelete(trade) {
      this.deleteTrade(trade)
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

  footer.modal-card-foot
    display: block
</style>