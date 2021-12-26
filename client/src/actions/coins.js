import * as api from '../api';

export const getCoins = () => async (dispatch) => {
    try {
        console.log("ac")
        const { data } = await api.fetchCoins();
        console.log(data)
        const action = { type: 'FETCH_ALL', payload: data }
        dispatch(action)
        
    } catch (error) {
        console.log(error)
    }

}