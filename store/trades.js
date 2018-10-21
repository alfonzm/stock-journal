import _ from 'lodash'
import sampleTrades from './sampleTrades.js'

export default {
  state: {
    // User's trades
      trades: sampleTrades
  },
  actions: {
    addTrade({ commit }, trade) {
      trade.id = Date.now()
      commit('ADD_TRADE', trade)
    },
    updateTrade({ state, commit }, trade) {
      commit('UPDATE_TRADE', trade)
    },
    deleteTrade({ state, commit }, trade) {
      if(confirm(`Are you sure you want to delete this trade: ${trade.symbol.toUpperCase()}?`)) {
        commit('DELETE_TRADE', trade)
      }
    }
  },
  mutations: {
    ADD_TRADE (state, trade) {
      state.trades.push(trade)
    },
    UPDATE_TRADE (state, trade) {
      const tradeToReplace = state.trades.find(t => t.id == trade.id)
      Object.assign(tradeToReplace, trade)
    },
    DELETE_TRADE (state, trade) {
      state.trades.splice(_.findIndex(state.trades, t => t.id == trade.id), 1)
    },
  },
  getters: {
    trades: state => {
      return _.chain(state.trades).sortBy(trade => trade.timestamp).reverse().value()
    }
  }
}