import Phisix from '@/utils/phisix'

export default {
  namespaced: 'true',
  state: {
    stocks: null,
    timestamp: null,
  },
  getters: {
    getStockPrice: (state) => symbol => {
      if(state.stocks && state.stocks.length > 0) {
        const stock = _.find(state.stocks, stock => stock.symbol.toUpperCase() == symbol.toUpperCase())
        return stock ? Number(stock.price.amount) : null
      } else {
        console.error('No stock prices data found.')
      }

      return null
    }
  },
  actions: {
    async retrieveStockPrices({ commit }) {
      const result = await Phisix.getAllStocks()
      commit('SET_STOCKS', result.data.stock)
      commit('SET_TIMESTAMP', result.data.as_of)
      return {
        stocks: result.data.stock,
        timestamp: result.data.as_of
      }
    }
  },
  mutations: {
    SET_TIMESTAMP (state, timestamp) {
      state.timestamp = timestamp
    },
    SET_STOCKS (state, stocks) {
      state.stocks = stocks
    },
    SET_STOCK (state, symbol, stock) {
      // TODO
    }
  }
}