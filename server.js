var path = require('path');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.json({message:'Hello World!'});
});

app.listen(3000, function () {
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