const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


const config = require('./config.js');

const starling = require('./services/starling.js');
const util = require('./services/util.js');
var cors = require('cors')
 
const app = express();
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const server = app.listen(1200, function () {
  var host = server.address().address
  var port = server.address().port
  
  console.log("App listening at http://%s:%s", host, port)
})


app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/accounts', async function (req, res) {
  const token = util.getUserToken(req.query.user);
  try {
    const accounts = await starling.accounts(token);
    res.send(accounts);
  }catch (err){
    console.log(err);
    res.send(500,err);
  }
})

app.get('/balance', async function (req, res) {
  const token = util.getUserToken(req.query.user);
  try {
    const balance = await starling.balance(token);
    res.send(balance);
  }catch (err){
    console.log(err);
    res.send(500,err);
  }
})

app.get('/contacts', async function (req, res) {
  const token = util.getUserToken(req.query.user);
  try {
    const contacts = await starling.contacts(token);
    res.send(contacts["_embedded"].contacts);
  }catch (err){
    console.log(err);
    res.send(500,err);
  }
})

//Adds contact to 
app.post('/contacts', async function (req, res) {
  const token = util.getUserToken(req.query.user);
  
  const contact = req.body;

  try {
    const contact = await starling.addContact(contact,token);
    res.send(contact);
  }catch (err){
    console.log(err);
    res.send(500,err);
  }
})

app.get('/transactions', async function (req, res) {
  const token = util.getUserToken(req.query.user);
  try {
    const transactions = await starling.transactions(token);
    res.send(transactions["_embedded"].transactions);
  }catch (err){
    console.log(err);
    res.send(500,err);
  }
})

app.post('/pay', async function (req, res) {
  const token = util.getUserToken(req.query.user);
  const transaction = req.body;
  try {
    const history = await starling.pay(transaction,token);
    // res.send(history);
  }catch (err){
    console.log(err);
    res.send(500,err);
  }
})


