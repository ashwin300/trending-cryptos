import Twit from 'twit';
import dotenv from 'dotenv';
import rp from 'request-promise';
import TwitterApi from 'twitter-api-v2';
 
import fetch from 'node-fetch'; 
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import * as fs from 'fs/promises'


let output
let pairsObject
export const getData = async (req, res) => {
    dotenv.config();
    const cbApi = process.env.cbApi;

 
    
 
    // const requestOptions = {
    //   method: 'GET',
    //   uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5000',
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
    //   fs.writeFile('cryptoData.json',  JSON.stringify(response), (error) => {
    //       if (error) throw error;
    //   })
    // }).catch((err) => {
    //   console.log('API call error:', err.message);
    // });
 
    await fs.readFile('./cryptoData.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return Promise.reject(err)
        }
 
        return resolve(jsonString)
        
    }).then(
        (p) => {
            pairsObject = JSON.parse(p)
        } 

    )

   const data = pairsObject.data


   output = data.length
   const symbolMap = new Map()
   function mySorter(a, b) {
    return parseFloat(b.market_cap_dominance) - parseFloat(a.market_cap_dominance)
   }
   const d2 = data.sort((a,b) => parseFloat(b.quote.USD.market_cap_dominance) - parseFloat(a.quote.USD.market_cap_dominance))

   let d3 = [];
   for(let i = 0; i < 25; i++){
       d3[i] = d2[i]
       console.log(d2[i].symbol + " " + parseFloat(d2[i].quote.USD.market_cap_dominance))
   }
   console.log(d3.length)
    // for(let i = 0; i < data.length; i++){
    //     if(symbolMap.get(data[i]) != undefined){
    //         console.log("dupe")
    //     }
    //     else{ 
    //     data[i].mentions = 0
    //     symbolMap.set(data[i].symbol, data[i])}
    // }
    // console.log(symbolMap.get('ETH'))
    
 
         
    await getTweets(d3)

   
    
 




    try {
        console.log(output)
        res.send(d3)
        
    } catch (error) {
        
    }

}
 
export async function getTweets(data) {
 
    const twtApi = process.env.twtAPI;
    const twtApiSecret = process.env.twtAPISECRET;
    const twtAccessToken = process.env.twtToken;
    const twtTokenSecret = process.env.twtTokenSecret;
    
    const bearer = process.env.bearer;
 
    // var T = new Twit({
    //     consumer_key:         twtApi,
    //     consumer_secret:      twtApiSecret,
    //     access_token:         twtAccessToken,
    //     access_token_secret:  twtTokenSecret,
    //     timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    //     strictSSL:            true,     // optional - requires SSL certificates to be valid.
    //   })

    //   T.get('count/tweets', { q: 'BTC since:2011-07-11', count: 100 }, function(err, data, response) {
    //     console.log(data)
    //   })
    // const twitterClient = new TwitterApi.TwitterApi(({
    //     appKey: twtApi,
    //     appSecret: twtApiSecret,
    //     accessToken: twtAccessToken,
    //     accessSecret: twtTokenSecret,
    //   }));
 
    const twitterClient = new TwitterApi.TwitterApi(bearer);

 
    const today = new Date();
    today.setHours(8)
    today.setMinutes(30)
    today.setSeconds(0)
    const yesterday = today
    yesterday.setDate(today.getDate() - 1)

    const yesterdayUTC = yesterday.toISOString()

    
    
    // const homeTimeline = await twitterClient.v2.search('BTC OR ETH', { max_results: 10 });
    
    for(let i = 0; i < 15; i++){
        var symbol = data[i].symbol

        if(symbol.includes('$')){
            
            symbol = symbol.replace('$',"")
 
        }
 
        const currentCoin = await twitterClient.v2.tweetCountRecent("(" + symbol + " OR " + data[i].name + ")" + " (coin OR token OR #cryptocurrency) -is:retweet", { granularity: 'day', start_time: yesterdayUTC})
        console.log(data[i].symbol + ": " + currentCoin.data[0].tweet_count)
        data[i].mentions = currentCoin.data[0].tweet_count
 

    }
    
 

  
  






}

function sleep(ms) {
    return new Promise(resolve => setTimeout(ms, resolve));
  }
  
  async function autoRetryOnRateLimitError(callback, promise) {
    while (true) {
      try {
        return await callback;
      } catch (error) {
        if (error instanceof ApiResponseError && error.rateLimitError && error.rateLimit) {
          const resetTimeout = error.rateLimit.reset * 1000; // convert to ms time instead of seconds time
          const timeToWait = resetTimeout - Date.now();
            console.log("rate limit hit..")
          await sleep(timeToWait);
          continue;
        }
  
        throw error;
      }
    }
  }