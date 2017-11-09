const express = require('express');
const db = require('../database/index.js');
const helpers = require('../helpers/github.js')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var body = '';
  req.on('data', (chunk) => {
  	body += chunk;
  });
  req.on('end', () => {
  	let cb = function() {
      console.log('WE CALLED POST ON REPOS');
      res.sendStatus(201);
  	};
    helpers.getReposByUsername(body, cb);
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('WE CALLED GET ON REPOS');
  db.get((results) => {
    res.statusCode = 200;
    res.send(results);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

