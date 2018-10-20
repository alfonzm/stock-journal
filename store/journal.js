export default {
  namespaced: 'true',
  state: {
    showTradeFormModal: false,
    tradeFormTrade: null,
  },
  actions: {
    showTradeFormModal({ commit }, trade) {
      if (trade) {
        commit('SET_TRADE_FORM_TRADE', trade)
      }
      commit('SET_SHOW_TRADE_FORM_MODAL', true)
    }
  },
  mutations: {
    SET_SHOW_TRADE_FORM_MODAL (state, value) {
      state.showTradeFormModal = value
    },
    SET_TRADE_FORM_TRADE (state, value) {
      state.tradeFormTrade = value
    },
  }
}