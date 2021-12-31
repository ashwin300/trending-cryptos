import React from 'react';
import useStyles from './styles'

import { Typography } from '@material-ui/core';

const PercentChange = ( { num } ) => {
   
    const classes = useStyles();
    const realNum = parseFloat(num);
    let negative = true
    if(realNum < 0){
        negative = true;
    }
    else{
        negative = false;
    }

    if(negative){
        return redText(num, classes.redText);
    }
    else{
        return greenText(num, classes.greenText)
    }
 
}
function redText(num, c){
    return (
        <Typography fontFamily="Inter" fontWeight={600} fontSize={18} className={c}>{num}%</Typography>
    )
}
function greenText(num, c){
    
    return (
        <Typography fontFamily="Inter" fontWeight={700} fontSize={18} className={c}>{num}%</Typography>
    )
}


export default PercentChange;