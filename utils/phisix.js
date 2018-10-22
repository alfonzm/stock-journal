import axios from 'axios'
import samplePhisixResult from '@/store/samplePhisixResult'

export default {
  getStock(symbol) {
    return axios.get(`/api/stocks/${symbol}`)
  },
  getAllStocks() {
    // return axios.get(`/api/stocks`)
    return {
      data: samplePhisixResult
    }
  },
}