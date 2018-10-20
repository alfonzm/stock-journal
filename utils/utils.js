import _ from 'lodash'
import TradeCalc from '@/utils/trade-calc'

export default {
  isTradeComplete(trade) {
    const buyQty = _.chain(trade.transactions).filter(tx => tx.type == 'buy' ).reduce((qty, tx) => qty += tx.quantity, 0).value()
    const sellQty = _.chain(trade.transactions).filter(tx => tx.type == 'sell' ).reduce((qty, tx) => qty += tx.quantity, 0).value()
    return buyQty == sellQty
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
}