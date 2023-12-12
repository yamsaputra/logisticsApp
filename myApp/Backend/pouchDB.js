import PouchDB from 'pouchdb';
const db = new PouchDB('my_database');
let serverdb = new PouchDB('http://admin:admin@127.0.0.1:5984/mitflyer');

/* // Create a new document
db.put({
  _id: 'my_doc',
  title: 'Let\'s try PouchDB'
}, function(err, response) {
  if (err) {
    return console.log(err);
  } else {
    console.log("Document created successfully", response);
  }
}); */

// Fetch a document
db.get('my_doc', function(err, doc) {
  if (err) {
    return console.log(err);
  } else {
    console.log(doc);
  }
});

db.allDocs({
    include_docs: true,
    attachments: true
    }, function(err, response) {
        if (err) {
            return console.log(err);
        }
        else {
            console.log(response);
        }
    });

// Replicate to a server.
db.replicate.to(serverdb).on('complete', function () {
    console.log("Replication completed");
}).on('error', function (err) {
    console.log("Replication error", err);
    });