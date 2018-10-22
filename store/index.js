import _ from 'lodash'
import Vuex from 'vuex'

import journal from '@/store/journal'
import trades from '@/store/trades'
import pse from '@/store/pse'

const createStore = () => {
  return new Vuex.Store({
    state: {
      stockSymbols: ['JFC', 'ALI', 'SMPH'],

      // User's trade plans
      tradePlans: [
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
      ],
    },
    mutations: {
      ADD_STOCK (state, myStock) {
        state.tradePlans.push(myStock)
      },
    },
    actions: {
      addMyStock({ commit }, myStock) {
        commit('ADD_MY_STOCK', myStock)
      },
    },
    modules: {
      journal,
      trades,
      pse,
    }
  })
}

export default createStore