const Guid = require('guid');

const request = require('request');
const config = require('../config.js');


async function api(url,token){
    return new Promise((resolve,reject) => {
        var options = {
            url: config.starling_url+url,
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

async function postApi(url, payload, token){
    return new Promise((resolve,reject) => {
        request.post({
            url:    config.starling_url+url,
            body:   JSON.stringify(payload),
            headers: {
              'Authorization': 'Bearer '+token,
              'Content-Type': 'application/json',
              "accept": "application/json"
            }
          }, function(error, response, body){
                if (!error && response.statusCode == 202) {
                    resolve(payload);
                }
                else
                    reject(error);
            });

    })
}

async function accounts(token){
    try {
        return await api("/accounts/",token);
    } catch (err){
        console.log(err);
        return "Failed to get accounts from Straling API"
    }
}

async function balance(token){
    try {
        return await api("/accounts/balance/",token);
    } catch (err){
        console.log(err);
        return "Failed to get balance from Straling API"
    }
}

async function transactions(token){
    try {
        return await api("/transactions/",token);
    } catch (err){
        console.log(err);
        return "Failed to get historic transactions from Straling API"
    }
}

async function contacts(token){
    try {
        return await api("/contacts/",token);
    } catch (err){
        console.log(err);
        return "Failed to get historic transactions from Straling API"
    }
}

async function addContact(contact,token){
    try {
        return await postApi("/contacts",contact,token);
    } catch (err){
        console.log(err);
        return "Failed to get historic transactions from Straling API"
    }
}



async function pay(transaction,token){
    try {
        const friend = {
            "id": Guid.raw(),
            "name": transaction.name,
            "accountNumber": transaction.accountNumber,
            "sortCode": transaction.sortCode
        }
        let payee = await addContact(friend,token);
        const money = {
            "payment": {
                "currency": "GBP",
                "amount": transaction.amount
            },
            "destinationAccountUid": friend.id,
            "reference": (!transaction.reference ? friend.name+" sent you moneyz! 🙌" : transaction.reference)
        }
        let payment = await makePayment(money,token);
        return "Sent!";
    } catch(err){
        throw err;
    }
}

module.exports = {
    balance,
    transactions,
    contacts,
    addContact,
    pay,
    accounts
}



