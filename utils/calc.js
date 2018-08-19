const PSE_TAX = 0.006 // percent

export default {
	// Commission thingies
	getBuyFees(price, quantity) {
		if(price <= 0) {
			return 0
		}

		const gross = price * quantity

		const commission = (0.0025*gross) > 20 ? (0.0025 * gross) : 20
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
	getRiskRewardRatio(entry, stopLoss, targetPrice) {
		if(!entry || !stopLoss || !targetPrice) {
			return 0
		}
		
		return (targetPrice - entry) / (entry - stopLoss)
	}
}