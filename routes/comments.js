var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/bottle';

var bottleDB = null;
var messages = [];

MongoClient.connect(url, function (err, db) {   /** Migrate to models folder after testing is completed */
    assert.equal(null, err);
    bottleDB = db;
});

var searchDocument = function(){                /** Migrate to models folder after testing is completed */
    bottleDB.collection('comments', function(err, collection){
        collection.find().toArray(function(err, results){
            messages = results;
        });
    });
};

var insertDocument = function(name, comment) {  /** Migrate to models folder after testing is completed */
    bottleDB.collection('comments').insertOne( {
        name : name,
        comment: comment
    });
};

router.route('/')
    .get(function(req, res) {

        searchDocument();
        res.json(messages);

    })
    .post(parseUrlEncoded, function (req, res) {

        var newComment = req.body;
        insertDocument(newComment.name, newComment.comment);
        res.json(messages);

    });

module.exports = router;