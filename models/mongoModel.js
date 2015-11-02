


var removeDocument = function(db){
    db.collection('restaurants').remove({
        "restaurant_id":"41704620"
    }, true);
};


//MongoClient.connect(url, function(err, db) {
//    assert.equal(null, err);
//    insertDocument(db, function() {
//        //db.close();
//    });
//});

