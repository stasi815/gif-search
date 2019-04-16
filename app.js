// Require Libraries
const express = require('express');

// Require HTTP MODULE
const http = require('http');

//Require Giphy Library
const giphy = require('giphy-api')();

// Middleware
const exphbs  = require('express-handlebars');


// App Setup
const app = express();

// Middleware

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Public Folder Styles
app.use(express.static('public'));

//HTTP Route
app.get('/', (req, res) => {
  console.log(req.query.term)
  const queryString = req.query.term;
  // ENCODE THE QUERY STRING TO REMOVE WHITE SPACES AND RESTRICTED CHARACTERS
  const term = encodeURIComponent(queryString);
  // PUT THE SEARCH TERM INTO THE GIPHY API SEARCH URL
  const url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

  http.get(url, (response) => {
    // SET ENCODING OF RESPONSE TO UTF8
    response.setEncoding('utf8');

    var body = '';

    response.on('data', (d) => {
      // CONTINUOUSLY UPDATE STREAM WITH DATA FROM GIPHY
      body += d;
    });

    response.on('end', () => {
      // WHEN DATA IS FULLY RECEIVED PARSE INTO JSON
      const gifs = JSON.parse(body).data
      // RENDER THE HOME TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
      res.render('home', { gifs });
    });
  });
});

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
