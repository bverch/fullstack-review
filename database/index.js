const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', function() 
  {
    //mongoose.connection.db.dropDatabase();
  });

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: String,
  forks: Number,
  username: String,
  url: String,
  description: String
});


let Repo = mongoose.model('Repo', repoSchema);

let save = (repo, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  /*console.log('called save', repo.name, repo.owner.login, repo.html_url, repo.description);
  var myRepo = new Repo({name: repo.name, username: repo.owner.login, url: repo.html_url, description: repo.description});
  myRepo.save(function (err, myRepo) {
    if (err) return console.error(err);
    console.log('SUCCESSFULLY SAVED!');
    console.log('SUCCESSFULLY SAVED!');
    console.log(myRepo);
    console.log('SUCCESSFULLY SAVED!');
    console.log('SUCCESSFULLY SAVED!');
  });*/
  //console.log('called save', repo);
  var myRepo = new Repo({name: repo.name, forks: repo.forks, username: repo.owner.login, url: repo.html_url, description: repo.description});
  console.log(myRepo.name, 'is my repos name');
  Repo.find({name: repo.name}, function (err, myRepos) {
  	if (err) return console.error(err);
  	if (myRepos.length === 0) {
	  myRepo.save(function (err, myRepo) {
	    if (err) return console.error(err);
	    console.log('SUCCESSFULLY SAVED!');
	    callback();
	  });
  	} else {
  		console.log('calling callback');
  		callback();
  	}
  	console.log('NOT SUCCESSFULLY SAVED!');
  }).catch(()=>console.log('FIND IN CATCH'));
}

let get = (callback) => {
  //console.log('Query for ', reponame);
  /*Repo.find(function (err, res) {
    console.log(res);
  });*/
  Repo.find('name username url description', function (err, myRepos) {
    if (err) return console.error(err);
    callback(myRepos);
  }).limit(35).sort({forks: -1});
}

module.exports.save = save;
module.exports.get = get;