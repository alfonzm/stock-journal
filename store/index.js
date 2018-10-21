import _ from 'lodash'
import Vuex from 'vuex'

import journal from '@/store/journal'

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

      // User's trades
      trades: [
        {
          "id": 1,
          "symbol": "ion",
          "position": "long",
          "remarks": "elliot waves",
          "strategy": "uptrend following",
          "transactions": [
            {
              "quantity": 1000,
              "type": "buy",
              "price": 2.23,
              "timestamp": "1/10/2018"
            },
            // {
            //   "quantity": 1000,
            //   "type": "sell",
            //   "price": 2.49,
            //   "timestamp": "1/12/2018"
            // },
          ]
        },
        {
          "id": 2,
          "symbol": "jfc",
          "position": "long",
          "strategy": "long term",
          "remarks": "nice",
          "transactions": [
            {
              "quantity": 100,
              "type": "buy",
              "price": 300,
              "timestamp": "2/1/2018"
            },
            {
              "quantity": 100,
              "type": "buy",
              "price": 310,
              "timestamp": "2/2/2018"
            },
            {
              "quantity": 200,
              "type": "sell",
              "price": 320,
              "timestamp": "2/2/2018"
            },
          ]
        },
        {
          "id": 3,
          "symbol": "smph",
          "position": "long",
          "strategy": "long term",
          "remarks": "",
          "transactions": [
            {
              "quantity": 50,
              "type": "buy",
              "price": 35,
              "timestamp": "3/1/2018"
            },
            {
              "quantity": 50,
              "type": "sell",
              "price": 32,
              "timestamp": "3/2/2018"
            },
          ]
        },
      ]
    },
    getters: {
      trades: state => {
        return _.chain(state.trades).sortBy(trade => trade.timestamp).reverse().value()
      }
    },
    mutations: {
      ADD_STOCK (state, myStock) {
        state.tradePlans.push(myStock)
      },
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
    actions: {
      addMyStock({ commit }, myStock) {
        commit('ADD_MY_STOCK', myStock)
      },
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
    modules: {
      journal,
    }
  })
}

export default createStore