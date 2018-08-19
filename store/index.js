import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      stockSymbols: ['JFC', 'ALI', 'SMPH'],
      myStocks: [
        {
          symbol: 'JFC',
          buyPrice: 200,
          quantity: 10
        },
        {
          symbol: 'ALI',
          buyPrice: 50,
          quantity: 100
        }
      ]
    },
    mutations: {
      addMyStock (state, myStock) {
        state.myStocks.push(myStock)
      }
    },
    actions: {
      addMyStock({ commit }, myStock) {
        commit('addMyStock', myStock)
      }
    }
  })
}

export default createStore