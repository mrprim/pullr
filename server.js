var path = require('path');
var express = require('express');
var app = express();
var api = require('./src/js/data/api.js'),

app.use(express.static('static'));
app.use(express.static('build'));

app.get('/comics', function(req, res) {
	api.comics.getComics(1).done(function(resp) {
		res.json(resp);
	});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Pullr is listening on port 3000!');
});

/*
module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, '/static/index.html')

    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
*/