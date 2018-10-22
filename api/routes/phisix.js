const axios = require('axios')
const { Router } = require('express')

const router = Router()

const PHISIX_BASE_URL = 'http://phisix-api.appspot.com'

/* GET all stocks */
router.get('/stocks', function (req, res, next) {
  axios.get(`${PHISIX_BASE_URL}/stocks.json`)
    .then(result => {
      res.json(result.data)
    })
    .catch(err => {
      res.json(err)
    })
})
/* GET stock */
router.get('/stocks/:symbol', function (req, res, next) {
  axios.get(`${PHISIX_BASE_URL}/stocks/${req.params.symbol}.json`)
    .then(result => {
      res.json(result.data)
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router