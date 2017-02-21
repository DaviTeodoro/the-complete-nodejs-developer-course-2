const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Middlewears
app.use((req, res, next) => {
    var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

//hbs helpers
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (t) => t.toUpperCase())

//Routers
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        wellcomeMessage: "Wellcome to the website"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
})

app.listen(port, () => console.log(`Sever is up on port ${port}`));