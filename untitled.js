var db = require('./models')


db.tag.create({name:'snarf'}).then(function(tag) {
  db.favorite.find().then(function(favorite){
    favorite.addTag(tag).then(function(e){
      console.log(e)
      console.log("--------------------")
      console.log(favorite)
      console.log("--------------------")
      console.log(tag)
    })
  });
});
