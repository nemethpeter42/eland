//var Datastore = require('nedb')
const fs = require('fs');

var express = require('express')
var backEnd = express()

var cors = require('cors')
backEnd.all('*', cors())

let csv = []

/*db = new Datastore({
	filename: 'movies.db',
	autoload:true,
})*/

var path = require('path')
// for using req.body.anything
var bodyParser = require('body-parser') 
// to support JSON-encoded bodies
backEnd.use( bodyParser.json() )
// to support URL-encoded bodies	
backEnd.use(bodyParser.urlencoded({
  extended: true
}))
// WARNING: don't put module.exports at the end,
// otherwise you get stuck in circular dependency problem
// (because of the earlier require calls)
module.exports = {csv:csv}
var wordRoute = require('./src/backend/routes/word')
var WordService = require('./src/backend/services/word.service')
let wordService = WordService.getInstance()
backEnd.use('/word', wordRoute)

backEnd.set('port', 3000)
backEnd.listen(backEnd.get('port'))
console.log('Express back end server listening on port ' + backEnd.get('port'))