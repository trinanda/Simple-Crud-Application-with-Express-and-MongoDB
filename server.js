const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
    if (err) return console.log(err);
    db = client.db('learnCrudExpressMongo');

    const port = 5000;

    app.listen(port, function(){
        console.log('server is running and listen a ' + port);
    });
})

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');


app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err);
        
        console.log('Saved to database');
        res.redirect('/');
    });
});

app.get('/', (req, res) => {
    db.collection('quotes').find({}).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  });
});
