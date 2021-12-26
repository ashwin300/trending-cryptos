import React from 'react';
import { Typography } from '@material-ui/core';
const Coin = ( { coin } ) => {

    return (
        <h1>{coin.name}</h1>
    );
}
export default Coin;