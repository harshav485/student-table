require('./models/db')
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser')
const studentController = require('./controllers/studentController');

var app = express();


//middleware
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());


app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: "mainLayout", layout: __dirname + 'views/layouts/' }));

app.listen(4000, () => {
    console.log('Express server stated at port : 4000');
});

app.get('/', function(req, res) {
    res.redirect('/student');
});
app.use('/student', studentController)