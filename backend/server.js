const express = require('express');
const request = require('request');

const app = express();

const config = require('./config.js');

const starling = require('./services/starling.js');

const server = app.listen(1200, function () {
  var host = server.address().address
  var port = server.address().port
  
  console.log("App listening at http://%s:%s", host, port)
})


app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/balance', async function (req, res) {
  try {
    const balance = await starling.balance(config.starling_token);
    res.send(balance);
  }catch (err){
    console.log(err);
    res.send(500,err);
  }

})




