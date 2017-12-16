const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

//for Heroku
const port = process.env.PORT || 8080;

//view engine
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//логи
app.use( (req, res, next) => {
   let now = new Date().toString();
   let log = `${now} -- url: ${req.url}`;
   fs.appendFileSync('server.log', log + '\n');
   next();
});


// app.use( (req, res, next) => {
//    res.render('maintenance.hbs');
// });

app.use(express.static( __dirname + '/public'));

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'main',
        hello: 'This is my first NODE JS dynamic web page!!! Yes Yes Yes!!!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'about',
        body: 'fuck PHP!!'
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio.hbs', {
        pageTitle: 'about',
        body: 'Portfolio page'
    });
});


app.listen(port, () => {
    console.log('server up on port', port);
});