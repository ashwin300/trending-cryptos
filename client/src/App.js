import React, { useEffect } from 'react';
import { Container, Grow, Grid, Typography, MuiThemeProvider } from '@material-ui/core';
import { getCoins } from './actions/coins'
import { useDispatch } from 'react-redux'
import Coins from './components/Coins/Coins'
import './App.css';
import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    typography: {
      fontFamily: 'Open Sans'
    },
  });

 
const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCoins())
    }, [dispatch])
    return (
        <MuiThemeProvider theme={theme}>
        <Container maxwidth='lg'>
            <Typography variant='h2' align="center">Trending Cryptocurrencies</Typography>
            <Grow in>
                <Container>
          
                
                        <Coins />
 
                </Container>
            </Grow>
        </Container>
        </MuiThemeProvider>
    );
}
export default App;