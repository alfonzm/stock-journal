import axios from 'axios'
import samplePhisixResult from '@/store/samplePhisixResult'

export default {
  getStock(symbol) {
    return axios.get(`/api/stocks/${symbol}`)
  },
  async getAllStocks() {
    // return axios.get(`/api/stocks`)
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      data: samplePhisixResult
    }
  },
}