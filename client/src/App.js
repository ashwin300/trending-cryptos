import React, { useEffect } from 'react';
import { Container, Grow, Grid, Typography } from '@material-ui/core';
import { getCoins } from './actions/coins'
import { useDispatch } from 'react-redux'
import Coins from './components/Coins/Coins'
const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCoins())
    }, [dispatch])
    return (
        <Container maxwidth='lg'>
            <Typography variant='h2' align="center">Trending Cryptocurrencies</Typography>
            <Grow in>
                <Container>
          
                
                        <Coins />
 
                </Container>
            </Grow>
        </Container>
    );
}
export default App;