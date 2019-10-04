const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', { userNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('Mongodb connection succeded')
    } else {
        console.log('errror in db connection ' + err)
    }
});

require('./student.model.js');