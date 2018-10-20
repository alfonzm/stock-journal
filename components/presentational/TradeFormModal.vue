<template lang="pug">
  .modal(:class="{ 'is-active': active }")
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title Add trade
        button.delete(aria-label="close" @click="close")
      section.modal-card-body
        trade-form(@submit="addStock" ref="tradeForm")
      footer.modal-card-foot
        button.button.is-primary.float-right(@click="submit") Add trade plan
        button.button(@click="close") Cancel
</template>

<script>

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
    onShow() {
      this.$refs.tradeForm.onShow()
    },
    onClose() {

    },
    addStock() {

    },
    close() {
      this.$emit('close')
      this.onClose()
    },
    submit() {
      this.$emit('submit')
    },
  }
}
</script>

<style lang="sass">
.modal-card
  width: 800px
</style>