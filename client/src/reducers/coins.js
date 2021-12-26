export default (coins = [], action) =>{
    switch(action.type){
        case 'FETCH_ALL':
            
            return action.payload;
    }
    return action
}