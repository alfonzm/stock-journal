<template lang="pug">
  .modal(:class="{ 'is-active': showFundTransactionFormModal }")
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title Add/Withdraw Funds
        button.delete(aria-label="close" @click="onCancel")
      section.modal-card-body
        fund-transaction-form(ref="fundTransactionForm")
      footer.modal-card-foot
        button.button.is-primary(@click="submit")
          template(v-if="selectedFundTransaction && selectedFundTransaction.id")
            | Save
          template(v-else)
            | Submit
        button.button(@click="onCancel") Cancel

        button.button.is-danger.is-outlined.is-pulled-right(@click="onDelete(selectedFundTransaction)" v-if="selectedFundTransaction") Delete
</template>

<script>

import { mapState, mapActions } from 'vuex'
import FundTransactionForm from '@/components/presentational/FundTransactionForm.vue'

// Events:
// close = called on closing the modal
// submit = called on submitting the modal (Add transaction or Save)
export default {
  components: { FundTransactionForm },
  watch: {
    showFundTransactionFormModal(show) {
      if(show) {
        this.onShow()
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if(this.showFundTransactionFormModal && e.key == 'Escape') {
        this.showFundTransactionFormModal = false
      }
    })
  },
  computed: {
    ...mapState('account', {
      selectedFundTransaction: state => state.selectedFundTransaction
    }),
    showFundTransactionFormModal: {
      get() {
        return this.$store.state.account.showFundTransactionFormModal
      },
      set(value) {
        this.$store.commit('account/SET_SHOW_FUND_TRANSACTION_FORM_MODAL', value)
      }
    },
  },
  methods: {
    ...mapActions('account', ['addFundTransaction', 'updateFundTransaction', 'deleteFundTransaction']),
    onShow() {
      // this.$refs.fundTransactionForm.onShow()
    },
    onCancel() {
      this.showFundTransactionFormModal = false
      this.$emit('close')
    },
    onDelete(fundTransaction) {
      this.deleteFundTransaction(fundTransaction)
      this.onCancel()
    },
    submit() {
      const fundTransactionData = this.$refs.fundTransactionForm.getFormData()
      if(fundTransactionData.id) {
        this.updateFundTransaction(fundTransactionData)
      } else {
        this.addFundTransaction(fundTransactionData)
      }
      this.$refs.fundTransactionForm.clearFields()
      this.$emit('submit')
      this.showFundTransactionFormModal = false
    },
  }
}
</script>

<style lang="sass">
.modal-card
  max-width: 450px

  footer.modal-card-foot
    display: block
</style>