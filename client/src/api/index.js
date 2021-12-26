import axios from 'axios';

const url = 'http://localhost:8000/data';

export const fetchCoins = () => axios.get(url);