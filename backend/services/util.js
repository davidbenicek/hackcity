const config = require("../config.js");


let users = {
  "malcolm" : {
    token : config.malcolm_token
  },
  "rincewind" : {
    token : config.rincewind_token
  }
}



function getUserToken(user){
  if(!user)
    return config.starling_token;

  return users[user].token;
}


module.exports = {
  getUserToken
};