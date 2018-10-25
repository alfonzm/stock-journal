import _ from 'lodash'
import Utils from '@/utils/utils'
import TradeCalc from '@/utils/trade-calc'

export default {
  getTotalDeposit(fundTransactions) {
    return _.chain(fundTransactions).filter({ type: 'deposit' }).sumBy('amount').value()
  },
}