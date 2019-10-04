require('./models/db')
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser')
const studentController = require('./controllers/studentController');
const mongoose = require('mongoose')
var app = express();
Students = require('./models/student.model');

const Student = mongoose.model('Student');


var db = mongoose.connection;
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

app.get('/api/students', function(req, res) {
    Students.getStudents(function(err, student) {
        if (!err) {
            res.json(student);
        } else {
            throw err;
        }
    });
});


app.post('/api/students', function(req, res) {
    var student = req.body;
    Students.addStudents(student, function(err, student) {
        if (!err) {
            res.json(student);
        } else {
            throw err;
        }
    });
});

app.put('/api/students/:_id', function(req, res) {
    var id = req.params._id;
    var student = req.body;
    Student.updateStudent(id, student, {}, function(err, student) {
        if (err) {
            throw err;
        }
        res.json(student);
    });
});

app.delete('/api/students/:_id', (req, res) => {
    var id = req.params._id;
    Student.removeStudent(id, (err, student) => {
        if (err) {
            throw err;
        }
        res.json(student);
    });
});

app.get('/api/students/:_id', function(req, res) {
    Students.getStudentById(req.params._id, function(err, student) {
        if (!err) {
            res.json(student);
        } else {
            throw err;
        }
    });
});

app.get('/', function(req, res) {
    res.redirect('/student');
});

app.use('/student', studentController)