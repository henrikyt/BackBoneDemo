// Setup mongoose and the database
var mongoose = require('mongoose/');
var config = require('./config');
db = mongoose.connect(config.creds.mongoose_auth),
    Schema = mongoose.Schema;

// require restify and bodyParser to read Backbone.js syncs
var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser());

var MessageSchema = new Schema({
    picture: String,
    saved: Boolean
});
// Use the schema to register a model
mongoose.model('Picture', MessageSchema);
var Picture = mongoose.model('Picture');


// This function is responsible for returning all entries for the Message model
function getMessages(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    Message.find().execFind(function (arr, data) {
        res.send(data);
    });
}

function postMessage(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // Create a new message model, fill it up and save it to Mongodb
    var picture = new Picture();
    picture.message = req.params.message;
    picture.date = new Date()
    picture.save(function () {
        res.send(req.body);
    });
}

// Set up our routes and start the server
server.get('/pictures', getMessages);
server.post('/pictures', postMessage);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
