const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  console.log(`token ${config.TOKEN}`);
  console.log('https://api.github.com/users/' + username + '/repos');
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  function callback(error, response, body) {
    if (error) return console.log(error);
    if (JSON.parse(body).message != 'Not Found') {
      let cbCount = 0;
      let callback = function() {
        cbCount++
        if (cbCount === JSON.parse(body).length) {
          cb();
        }
      };
      JSON.parse(body).forEach((elt)=>{db.save(elt, callback)});
    } else {
      cb();
    }
  }
  request(options, callback);

}

module.exports.getReposByUsername = getReposByUsername;