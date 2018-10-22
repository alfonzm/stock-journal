import _ from 'lodash'
import TradeCalc from '@/utils/trade-calc'
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
    },
    portfolioStocks: state => {
      // returns all stocks owned by user based on trades
      // each stock contains the transactions
      // filtered by if user still holding the stocks (e.g. if buy 100 sold 100, it's not included)
      //
      // sample:
      // "jfc": [
      //   {
      //     "quantity": 100,
      //     "type": "buy",
      //     "price": 300,
      //     "timestamp": "2/1/2018"
      //   },
      //   {
      //     "quantity": 100,
      //     "type": "buy",
      //     "price": 310,
      //     "timestamp": "2/2/2018"
      //   },
      //   {
      //     "quantity": 200,
      //     "type": "sell",
      //     "price": 320,
      //     "timestamp": "2/2/2018"
      //   }
      // ],
      // "smph": [
      //   ...
      // ]
      let stockTransactions = {}

      _.forEach(state.trades, trade => {
        if(!(trade.symbol in stockTransactions)) {
          if(TradeCalc.getRemainingQuantity(trade.transactions) <= 0) {
            return
          }

          stockTransactions[trade.symbol] = []
        }
        
        stockTransactions[trade.symbol] = stockTransactions[trade.symbol].concat(trade.transactions)
      })

      return stockTransactions
    },
  }
}