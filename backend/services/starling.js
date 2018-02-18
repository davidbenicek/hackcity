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
        let transactions =  await api("/transactions/",token);
        transactions = transactions["_embedded"].transactions;
        console.log("yooo",transactions[0]);
        let formatedTransactions = {
            today : [],
            yesterday : [],
            before : []
        };
        // var date = Date.now();
        let date = new Date();
        let string_date = date.toISOString();
        string_date = string_date.split("T")[0];
        const today = string_date
        let i = 0;
        while(!transactions[i].created.indexOf(today) && i < transactions.length -1){
            console.log("YP",transactions[i].created, today);
            delete transactions[i]["_links"];
            formatedTransactions.today.push(transactions[i]);
            i++;
        }
        date.setDate(date.getDate()-1);
        string_date = date.toISOString();
        const yesterday  = string_date.split("T")[0];
        while(!transactions[i].created.indexOf(yesterday) && i < transactions.length -1 ){
            console.log("YP",transactions[i].created, yesterday);
            delete transactions[i]["_links"];
            formatedTransactions.yesterday.push(transactions[i]);
            i++;
        }
        while(i < transactions.length -1 ){
            formatedTransactions.before.push(transactions[i]);
            delete transactions[i]["_links"];
            i++;
        }
        const fake = [{
            "id": "6f03a23a-bbfc-4479-8d4d-abb6a9119d27",
            "currency": "GBP",
            "amount": -23.45,
            "direction": "OUTBOUND",
            "created": "2017-07-05T18:27:02.335Z",
            "narrative": "Borough Barista",
            "source": "MASTER_CARD",
            "balance": 254.12
          },{
            "id": "6f03a23a-bbfc-4479-8d4d-abb6a9119d27",
            "currency": "GBP",
            "amount": +3.45,
            "direction": "OUTBOUND",
            "created": "2017-07-05T18:27:02.335Z",
            "narrative": "Borough Barista",
            "source": "MASTER_CARD",
            "balance": 4.12
          }]
        // formatedTransactions.before = fake;
        console.log("Formated",formatedTransactions);
        console.log(formatedTransactions.today.length,",",formatedTransactions.yesterday.length,",",formatedTransactions.before.length)
        return formatedTransactions;
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



