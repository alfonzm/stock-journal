# stock-journal

## Models

TradePlan
- symbol
- buyPrice
- sellPrice
- quantity
- notes
- buyDate
- sellDate
- targetBuyPrice
- targetProfit
- cutLoss
- trailingStop

<!-- name | description | example
---|---|---
symbol | stock symbol | JFC, ALI
buyPrice | -->



Trade
// when adding a trade entry, a trade can be simple/complex
// simple - 1 buy and 1 sell only. can be just 1 simple form with entry and exit price (i.e. 2 transactions)
// complex - multiple buy/sell transactions/tranches
- symbol
- remarks
- position (long/short)
- (ave buy)
- (ave sell)
- (profit)
- (change)
- (win/lose)
- (date start/end)
- [transactions]
	- type (buy/sell)
	- quantity
	- price
	- timestamp