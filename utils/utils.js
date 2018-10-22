import _ from 'lodash'
import TradeCalc from '@/utils/trade-calc'

export default {
  // String/Numbers utility functions
  currencify(number, decimals = 0) {
    return Number(number).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  },
  commafy(number) {
    return this.currencify(number)
  },

  // Trades utility functions
  isTradeComplete(trade) {
    return this.isTransactionsComplete(trade.transactions)
  },
  isTransactionsComplete(transactions) {
    const buyQty = _.chain(transactions).filter(tx => tx.type == 'buy' ).reduce((qty, tx) => qty += Number(tx.quantity), 0).value()
    const sellQty = _.chain(transactions).filter(tx => tx.type == 'sell' ).reduce((qty, tx) => qty += Number(tx.quantity), 0).value()
    return buyQty > 0 && sellQty > 0 && buyQty == sellQty
  },
  isTradeWinning(trade) {
    return TradeCalc.getTransactionsProfit(trade.transactions) > 0
  },
  isTradeLosing(trade) {
    return TradeCalc.getTransactionsProfit(trade.transactions) < 0
  },
  tradeResult(trade) {
    // returns win, lose or null
    return this.isTradeWinning(trade) ? 'win' : this.isTradeLosing(trade) ? 'lose' : 'draw'
  },
  greenOrRed(value) {
    return Number(value) > 0 ? 'green' : Number(value) < 0 ? 'red' : null
  },
  greenRedOrOrange(value) {
    return Number(value) > 0 ? 'green' : Number(value) < 0 ? 'red' : 'orange'
  },
}