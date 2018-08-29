import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      stockSymbols: ['JFC', 'ALI', 'SMPH'],
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
      trades: [
        {
          "symbol": "ion",
          "position": "long",
          "remarks": "elliot waves",
          "transactions": [
            {
              "quantity": 1000,
              "type": "buy",
              "price": 2.23,
              "timestamp": "1000"
            },
            {
              "quantity": 1000,
              "type": "sell",
              "price": 2.49,
              "timestamp": "3000"
            },
          ]
        },
        {
          "symbol": "jfc",
          "position": "long",
          "remarks": "nice",
          "transactions": [
            {
              "quantity": 100,
              "type": "buy",
              "price": 300,
              "timestamp": "1000"
            },
            {
              "quantity": 100,
              "type": "buy",
              "price": 310,
              "timestamp": "1500"
            },
            {
              "quantity": 200,
              "type": "sell",
              "price": 320,
              "timestamp": "3000"
            },
          ]
        },
      ]
    },
    mutations: {
      addMyStock (state, myStock) {
        state.tradePlans.push(myStock)
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