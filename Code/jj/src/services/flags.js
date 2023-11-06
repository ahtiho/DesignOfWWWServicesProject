import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = (name) => {
  return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
}


export default {
    getAll: getAll}