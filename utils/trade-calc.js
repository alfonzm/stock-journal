import _ from 'lodash'
import Utils from '@/utils/utils'

const PSE_TAX = 0.006 // percent

export default {
	// Commission thingies -----------------------------------------------
	getBuyFees(price, quantity) {
		if(price <= 0) {
			return 0
		}

		const gross = price * quantity

		const commission = (0.0025 * gross) > 20 ? (0.0025 * gross) : 20
		const vat = commission * 0.12
		const pseFee = 0.00005 * gross
		const sccpFee = 0.0001 * gross

		return commission + vat + pseFee + sccpFee
	},
	getSellFees(sellPrice, quantity) {
		var gross = sellPrice * quantity
		var fees = this.getBuyFees(sellPrice, quantity)

		var salesTax = gross * PSE_TAX

		return fees + salesTax
	},



	// Actual costs -----------------------------------------------
	getBuyCost(price, quantity) {
		return (price * quantity) + this.getBuyFees(price, quantity)
	},
	getSellCost(price, quantity) {
		return (price * quantity) - this.getSellFees(price, quantity)
	},
	getProfit(entry, exit, quantity) {
		if(!entry || !exit || !quantity) {
			return 0
		}

		return this.getSellCost(exit, quantity) - this.getBuyCost(entry, quantity)
	},
	getAmount(type, price, quantity) {
		if(!type || !price || !quantity) {
			return 0
		}

		if(type == 'buy') {
			return this.getBuyCost(price, quantity)
		} else if (type == 'sell') {
			return this.getSellCost(price, quantity)
		}

		return 0
	},



	// % Change -----------------------------------------------
	getChangePercent(profit, buyCost) {
		if(!profit || !buyCost || buyCost <= 0)
			return 0

		return Math.round((profit / buyCost * 100) * 100) / 100
	},



	// Risk Reward Ratio -----------------------------------------------
	getRiskRewardRatio(entry, stopLoss, targetPrice) {
		if(!entry || !stopLoss || !targetPrice) {
			return 0
		}
		
		return (targetPrice - entry) / (entry - stopLoss)
	},
	getPrettyRiskRewardRatio(entry, stopLoss, targetPrice) {
		return `1:${this.getRiskRewardRatio(entry, stopLoss, targetPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
	},



	// TradePlan -----------------------------------------------
	// getTradePlanStats({ entryPrice, exitPrice, quantity, stopLossPrice}) {
	// 	const profit = this.getProfit(entryPrice, exitPrice, quantity)
	// 	const buyCost = this.getBuyCost(entryPrice, quantity)
	// 	return {
	// 		riskRewardRatio: this.getPrettyRiskRewardRatio(entryPrice, stopLossPrice, exitPrice),
	// 		changePercentage: this.getChangePercent(profit, buyCost),
	// 		buyCost: buyCost,
	// 		profit: this.getProfit(entryPrice, exitPrice, quantity)
	// 	}
	// },



	// Trade -----------------------------------------------

	// Cost of all transactions
	getTransactionsCost(transactionType, transactions) {
		return _
			.chain(transactions)
			.filter({ type: transactionType })
			.sumBy(transaction => {
				return transactionType == 'buy' ?
					this.getBuyCost(transaction.price, transaction.quantity) :
					this.getSellCost(transaction.price, transaction.quantity)
			})
			.value()
	},
	getTransactionsBuyCost(transactions) { return this.getTransactionsCost('buy', transactions) },
	getTransactionsSellCost(transactions) { return this.getTransactionsCost('sell', transactions) },

	// Get cost of remaining stocks held
	getRemainingBuyCost(transactions) {
		return this.getTransactionsBuyCost(transactions) - this.getTransactionsSellCost(transactions)
		// this.getBuyCost(transaction.price, this.getRemainingQuantity(transactions))
	},
	getTransactionsBuyCost(transactions) { return this.getTransactionsCost('buy', transactions) },
	getTransactionsSellCost(transactions) { return this.getTransactionsCost('sell', transactions) },

	// Profit
	getTransactionsProfit(transactions) {
		if(!Utils.isTransactionsComplete(transactions)) {
			return 0
		}
		
		return this.getTransactionsSellCost(transactions) - this.getTransactionsBuyCost(transactions)
	},
	getTransactionsChange(transactions) {
		if(!Utils.isTransactionsComplete(transactions)) {
			return 0
		}

		const profit = this.getTransactionsProfit(transactions)
		const buyCost = this.getTransactionsBuyCost(transactions)

		return buyCost == 0 ? 0 : (profit / buyCost) * 100
	},

	// Get shares quantity of transactions per type
	getTotalQuantityByTransactionType(transactionType, transactions) {
		return _
			.chain(transactions)
			.filter({ type: transactionType })
			.sumBy(transaction => Number(transaction.quantity))
			.value()
	},
	getTotalBuyQuantity(transactions) { return this.getTotalQuantityByTransactionType('buy', transactions) },
	getTotalSellQuantity(transactions) { return this.getTotalQuantityByTransactionType('sell', transactions) },

	// Timestamp
	getTimestamp(transactionType, transactions) {
		return _
			.chain(transactions)
			.filter({ type: transactionType })
			.orderBy(['timestamp'], ['desc'])
			.map('timestamp')
			.first()
			.value()
	},
	getBuyTimestamp(transactions) { return this.getTimestamp('buy', transactions) },
	getSellTimestamp(transactions) { return this.getTimestamp('sell', transactions) },

	// Average price
	// getAveragePrice(transactionType, transactions) {
	// 	return _
	// 		.chain(transactions)
	// 		.filter({ type: transactionType })
	// 		.meanBy(transaction => Number(transaction.price))
	// 		.value()
	// },
	getAverageBuyPrice(transactions) {
		return this.getTransactionsBuyCost(transactions) / this.getTotalBuyQuantity(transactions)
	},
	getAverageSellPrice(transactions) {
		return this.getTransactionsSellCost(transactions) / this.getTotalSellQuantity(transactions)
	},

	// Get remaining number of stocks held
	getRemainingQuantity(transactions) {
		return _.reduce(transactions, (total, tx) => {
      return total + (Number(tx.quantity) * (tx.type == 'buy' ? 1 : -1))
    }, 0)
	}
}