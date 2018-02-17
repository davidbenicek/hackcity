const request = require('request');
const config = require('../config.js');


async function api(url,token){
    return new Promise((resolve,reject) => {
        var options = {
            url: 'https://api-sandbox.starlingbank.com/api/v1'+url,
            headers: {
              'Authorization': 'Bearer '+token
            }
        };
    
        request(options, async (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const info = JSON.parse(body);
                resolve(info);
            }
            else
                reject(error);
          });

    })
}

async function balance(token){
    try {
        return await api("/accounts/balance/",token);
    } catch (err){
        console.log(err);
        return "Failed to get balance from Straling API"
    }
}

module.exports = {
    balance
}



