// Require Libraries
const express = require('express');

const giphy = require('giphy-api')();

// App Setup
const app = express();

// Middleware
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes

// app.get('/hello-squirrel', (req, res) => {
//  res.send('Hello Squirrel');
// });

app.get('/hello-gif', (req, res) => {
  const gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', { gifUrl });
});

app.get('/greetings/:name', (req, res) => {
  const name = req.params.name;
  res.render('greetings', { name });
});

app.get('/', (req, res) => { // => "{ term: hey" }
  console.log(req.query)
  res.render('home')
});

app.get('/', (req, res) => {
  res.render('home')
});

// GIPHY API Route

app.get('/', (req, res) => {
  giphy.search(req.query.term, (err, response) => {
    const gifs = response.data;
    res.render('home', { gifs })
  });
});

// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});
