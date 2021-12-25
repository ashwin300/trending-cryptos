import Twit from 'twit';
import dotenv from 'dotenv'
import rp from 'request-promise'
import fs from 'fs'
 
 
export const getData = (req, res) => {
    dotenv.config();
    const cbApi = process.env.cbApi;

 
 
    // const requestOptions = {
    //   method: 'GET',
    //   uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map',
    //   qs: {
 
    //   },
    //   headers: {
    //     'X-CMC_PRO_API_KEY': cbApi
    //   },
    //   json: true,
    //   gzip: true
    // };
    
    // rp(requestOptions).then(response => {
    //   console.log('API call response:', response);
    //   fs.writeFile('cryptoMap.json',  JSON.stringify(response), (error) => {
    //       if (error) throw error;
    //   })
    // }).catch((err) => {
    //   console.log('API call error:', err.message);
    // });

    
    
    var T = new Twit({
        consumer_key:         '...',
        consumer_secret:      '...',
        access_token:         '...',
        access_token_secret:  '...',
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
      })


    try {
        console.log("Data")
        res.send("Working")
        
    } catch (error) {
        
    }

}