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
        const options = {
            url:    config.starling_url+url,
            body:   JSON.stringify(payload),
            headers: {
              'Authorization': 'Bearer '+token,
              'Content-Type': 'application/json',
              "accept": "application/json"
            }
        };
        request.post(options, function(error, response, body){
                if (!error && response.statusCode == 202) {
                    resolve(payload);
                }
                else
                    reject(error);
            });

    })
}

async function deleteApi(url, token){
    return new Promise((resolve,reject) => {
        const options = {
            url:    config.starling_url+url,
            headers: {
              'Authorization': 'Bearer '+token,
              "accept": "application/json"
            }
        };
        request.delete(options, function(error, response, body){
                if (!error && response.statusCode == 204) {
                    resolve(url);
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
        throw "Failed to get balance from Straling API"
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
            transactions[i].positive = (transactions[i].amount > 0);
            let temp_date = new Date(transactions[i].created);
            transactions[i].created = temp_date.getHours()+":"+temp_date.getMinutes()
            formatedTransactions.today.push(transactions[i]);
            i++;
        }
        date.setDate(date.getDate()-1);
        string_date = date.toISOString();
        const yesterday  = string_date.split("T")[0];
        while(!transactions[i].created.indexOf(yesterday) && i < transactions.length -1 ){
            console.log("YP",transactions[i].created, yesterday);
            transactions[i].positive = (transactions[i].amount > 0);
            delete transactions[i]["_links"];
            let temp_date = new Date(transactions[i].created);
            transactions[i].created = temp_date.getHours()+":"+temp_date.getMinutes()
            formatedTransactions.yesterday.push(transactions[i]);
            i++;
        }
        while(i < transactions.length -1 ){
            transactions[i].positive = (transactions[i].amount > 0);
            delete transactions[i]["_links"];
            let temp_date = new Date(transactions[i].created);
            transactions[i].created = temp_date.getHours()+":"+temp_date.getMinutes()
            formatedTransactions.before.push(transactions[i]);
            i++;
        }
        const fake = [{
            "id": "6f03a23a-bbfc-4479-8d4d-abb6a9119d27",
            "currency": "GBP",
            "amount": -23.45,
            "direction": "OUTBOUND",
            "created": "18:27",
            "narrative": "Borough Barista",
            "source": "MASTER_CARD",
            "balance": 254.12
          },{
            "id": "6f03a23a-bbfc-4479-8d4d-abb6a9119d27",
            "currency": "GBP",
            "amount": +3.45,
            "direction": "OUTBOUND",
            "created": "14:27",
            "narrative": "Borough Barista",
            "source": "MASTER_CARD",
            "balance": 4.12
          }]
        formatedTransactions.before = fake;
        console.log("Formated",formatedTransactions);
        console.log(formatedTransactions.today.length,",",formatedTransactions.yesterday.length,",",formatedTransactions.before.length)
        return formatedTransactions;
    } catch (err){
        console.log(err);
        throw "Failed to get historic transactions from Straling API"
    }
}

async function contacts(token){
    try {
        return await api("/contacts/",token);
    } catch (err){
        console.log(err);
        throw "Failed to get contacts from Straling API"
    }
}

async function getContactsProfile(contact_id,token){
    try {
        return await api(`/contacts/${contact_id}/accounts`,token);
    } catch (err){
        console.log(err);
        throw "Failed to get contacts from Straling API"
    }
}

async function findContact(name,token){
    let allContacts = await contacts(token);
    allContacts = allContacts["_embedded"].contacts;
    for(const p in allContacts){
        if(allContacts[p].name == name){
            return allContacts[p];
        }
        if(p == allContacts.length -1){
            return undefined;
        }
    }
}

async function addContact(contact,token){
    try {
        return await postApi("/contacts",contact,token);
    } catch (err){
        console.log(err);
        throw "Failed to add contact using Straling API"
    }
}

async function makePayment(transaction,token){
    try {
        return await postApi("/payments/local",transaction,token);
    } catch (err){
        console.log(err);
        throw "Failed to make a payment via Straling API"
    }
}

async function deleteContact(id,token){
    const url = `/contacts/${id}`;
    await deleteApi(url,token);
}


async function pay(transaction,token){
    try {
        const friend = {
            "name": transaction.name,
            "accountNumber": transaction.accountNumber,
            "sortCode": transaction.sortCode
        }
        let tempContactFlag = false;
        //Look for contact
        console.log("Looking for "+friend.name);
        let contactInfo = await findContact(friend.name,token);
        if(!contactInfo){
            //If it doesn't exist, 
            //add the contact
            console.log("Adding temp contact.....")
            await addContact(friend,token);
            tempContactFlag = true;
            //Find it again
            contactInfo = await findContact(friend.name,token);
            console.log("Added and found: ",contactInfo.id);
        }
        else
            console.log("Paying known contact....");

        let payee = await getContactsProfile(contactInfo.id,token);        
        console.log("Found payee acc info: ",payee.contactAccounts[0].id);

        //Pay
        //Create transaction object
        const money = {
            "payment": {
                "currency": "GBP",
                "amount": transaction.amount
            },
            "destinationAccountUid": payee.contactAccounts[0].id,
            "reference": (!transaction.reference ? "🙌 moneyz!" : transaction.reference)
        }

        console.log("Starting payment...");
        let payment = await makePayment(money,token);
        console.log("Payment complete!");
        //If we added temp, delete
        if(tempContactFlag){
            console.log("Deleting temp contact "+contactInfo.id);
            await deleteContact(contactInfo.id,token);
            console.log("Deleted!");
        }
        console.log("----- PAYMENT DONE! -----")
        return payment;
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
