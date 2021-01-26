var mongoose = require('mongoose');

(async() => {
    
    // `snappy`, `zlib`'
    // await mongoose.connect('mongodb://127.0.0.1:27017/docker_mongodb_1', {
    await mongoose.connect('mongodb://localhost/Tododb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });

    var schemaObj = new mongoose.Schema(
        {
            id: mongoose.Schema.Types.ObjectId,
            title: String,
            completed: Boolean                
        }, { collection: 'Todo'});
    
    var TODO = mongoose.model('todo', schemaObj);

//    await TODO.find( (err,res) => {
    await TODO.findOne({title: {$eq:"Prova"} } ,(err,res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
            console.log(JSON.stringify(res));
        }
    });

})();
console.log("esco");
