import _ from 'lodash'
import Vuex from 'vuex'

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
            {
              "quantity": 1000,
              "type": "sell",
              "price": 2.49,
              "timestamp": "1/12/2018"
            },
          ]
        },
        {
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
      }
    },
    actions: {
      addMyStock({ commit }, myStock) {
        commit('ADD_MY_STOCK', myStock)
      },
      addTrade({ commit }, trade) {
        commit('ADD_TRADE', trade)
      }
    },
  })
}

export default createStore