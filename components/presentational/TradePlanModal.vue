<template lang="pug">
  .modal(:class="{ 'is-active': active }")
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title Add trade plan
        button.delete(aria-label="close" @click="close")
      section.modal-card-body
        trade-plan-form(@submit="addStock" ref="tradePlanForm")
      footer.modal-card-foot
        button.button.is-primary.float-right(@click="submit") Add trade plan
        button.button(@click="close") Cancel
</template>

<script>

import TradePlanForm from '@/components/presentational/TradePlanForm.vue'

export default {
  components: { TradePlanForm },
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
      this.$refs.tradePlanForm.onShow()
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

<style>
</style>