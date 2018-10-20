# stock-journal

## Models

### TradePlan
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

### Trade

A single entry to the trade journal

When adding a trade entry, a trade can be simple/complex. This is not saved to the model, UX purposes only.
- simple - 1 buy and 1 sell only. can be just 1 simple form with entry and exit price (i.e. 2 transactions)
- complex - multiple buy/sell transactions/tranches

#### Fields:

- symbol
- remarks
- strategy
- position (long/short)
- [transactions]
	- type (buy/sell)
	- quantity
	- price
	- timestamp

#### Methods/Helpers:

- ave buy
- ave sell
- profit
- change
- win/lose
- date start/end

#### Sample data:

```
{
  "symbol": "jfc",
  "position": "long",
  "remarks": "nice",
  "transactions": [
    {
      "quantity": "100",
      "type": "buy",
      "price": "300",
      "timestamp": ""
    },
    {
      "quantity": "100",
      "type": "sell",
      "price": "320",
      "timestamp": ""
    }
  ]
}
```