import React from 'react';
import Coin from './Coin/Coin'
import { Grid, CircularProgress, List, ListItem, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper} from '@material-ui/core'
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';


const Coins = () => {
    const coins = useSelector((state) => state.coins)
 

    console.log(coins);
 

const columns = [
  { field: 'id', headerName:'#', width: 30}, 
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'symb', headerName: 'Symbol', width: 70 },
  { field: 'price', headerName: 'Price', width: 200 },
  {
    field: 'dayChange',
    headerName: '24h %',
    width: 200,
  } 
];

let rows = [];

if(coins.length){
  coins.map((coin) => {rows.push({ id: coin.id, rank: coin.id + 2, name: coin.name, symb: coin.symbol, price: coin.quote.USD.price, dayChange: coin.quote.USD.percent_change_24h})} );
}
 


  return (
    <div style={{ height: '1000px', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize={true}
        rowsPerPageOptions={[100]}
 
      />
    </div>
  );
 

    // return (
    //     !coins.length ? <CircularProgress /> : (
       
    //             <List>
                     
    //             {
    //                 coins.map((coin) => (
                     
    //                         <ListItem divider>
    //                         <Coin coin={coin} />
                             
    //                         </ListItem>
                           
                            
                           
    //                 ))
                    
    //             }
    //             </List>

       
    //     )
    // );
}
export default Coins;