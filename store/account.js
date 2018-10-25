import _ from 'lodash'
import FundCalc from '@/utils/fund-calc'

export default {
  namespaced: true,
  state: {
    // UI stuff
    showFundTransactionFormModal: false,
    selectedFundTransaction: null,

    // User data
    fundTransactions: [
      {
        id: 1,
        timestamp: '1/1/2018',
        type: 'deposit',
        amount: 30000,
        remarks: null,
        fees: 125.20
      },
      {
        id: 2,
        timestamp: '1/2/2018',
        type: 'deposit',
        amount: 30000,
        remarks: 'auto generated',
        fees: 125.20
      },
      {
        id: 1,
        timestamp: '1/3/2018',
        type: 'deposit',
        amount: 30000,
        remarks: 'auto generated',
        fees: 125.20
      },
    ]
  },
  actions: {
    addFundTransaction({ commit }, fundTransaction) {
      fundTransaction.id = Date.now()
      commit('ADD_FUND_TRANSACTION', fundTransaction)
    },
    updateFundTransaction({ state, commit }, fundTransaction) {
      commit('UPDATE_FUND_TRANSACTION', fundTransaction)
    },
    deleteFundTransaction({ state, commit }, fundTransaction) {
      if(confirm('Are you sure you want to delete this transaction?')) {
        commit('DELETE_FUND_TRANSACTION', fundTransaction)
      }
    },
    showFundTransactionFormModal({ commit }, fundTransaction) {
      if (fundTransaction) {
        commit('SET_SELECTED_FUND_TRANSACTION', fundTransaction)
      }
      commit('SET_SHOW_FUND_TRANSACTION_FORM_MODAL', true)
    }
  },
  mutations: {
    SET_SHOW_FUND_TRANSACTION_FORM_MODAL(state, value) {
      state.showFundTransactionFormModal = value
    },
    SET_SELECTED_FUND_TRANSACTION(state, fundTransaction) {
      state.selectedFundTransaction = fundTransaction
    },
    ADD_FUND_TRANSACTION (state, fundTransaction) {
      state.fundTransactions.push(fundTransaction)
    },
    UPDATE_FUND_TRANSACTION (state, fundTransaction) {
      const fundTransactionToReplace = state.fundTransactions.find(fundTx => fundTx.id == fundTransaction.id)
      Object.assign(fundTransactionToReplace, fundTransaction)
    },
    DELETE_FUND_TRANSACTION (state, fundTransaction) {
      state.fundTransactions.splice(_.findIndex(state.fundTransactions, fundTx => fundTx.id == fundTransaction.id), 1)
    },
  },
  getters: {
    availableCash(state, getters, rootState, rootGetters) {
      return FundCalc.getTotalDeposit(state.fundTransactions) - rootGetters.portfolioBuyCost
    },
    equityValue(state, getters, rootState, rootGetters) {
      return getters.availableCash + rootGetters.portfolioMarketPrice
    }
  }
}