'use strict';
const express = require('express');
const app = express();
var AWS = require('aws-sdk');
AWS.config.update({accessKeyId: process.env.ACCESS_ID, secretAccessKey:  process.env.SECRET_ACCESS_KEY, region: process.env.REGION});
var db = new AWS.DynamoDB();
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4000;
const path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  // Handle React routing, return all requests to React app
  app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.get('/', (req, res) => {
  var params = {
    TableName : 'Med-ETrack'
  }

  db.scan(params, function(err, data) {
    if (err) {
      console.log(err);
      }
    else {
      console.log(data);
      data.Items.sort(function(a, b){
        return b.lastTimeTaken.S - a.lastTimeTaken.S;
      })
      res.send(data);
      }
  });
});

app.post('/', (req, res) => {
  var params = {
    TableName : 'Med-ETrack',
    Item: req.body
  }

  db.putItem(params, function(err, data) {
    if (err) {
      console.log(err);
      }
    else {
      console.log(data);
      res.send(data);
      }
  });
});


app.listen(PORT, () => {console.log('App listening on port ' + PORT)});
