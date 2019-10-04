const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student')

router.get('/', (req, res) => {
    res.render("student/addOrEdit.hbs", {
        viewTitle: "Insert Student"
    });
});

router.post('/', (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res) {
    var student = new Student();
    student.fullName = req.body.fullName;
    student.father_name = req.body.father_name;
    student.Roll_number = req.body.Roll_number;
    student.Mobile = req.body.Mobile;
    student.save((err, doc) => {
        if (!err)
            res.redirect('student/list');
        else {
            if (err.name == 'Validation error') {
                handlaValidationError(err, req.body);
                res.render("student/addOrEdit.hbs", {
                    viewTitle: "Insert Student",
                    employee: req.body
                });
            } else {
                console.log('Error during record insertion:' + err);
            }
        }
    });
}

function updateRecord(req, res) {
    Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('student/list.hbs');
        } else {
            if (err.name == 'validationError') {
                handlaValidationError(err, req.body);
                res.render("student/addOrEdit.hbs", {
                    viewTitle: 'Update Student',
                    employee: req.body
                });
            } else
                console.log('Error during recoed update :' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Student.find((err, docs) => {
        if (!err) {
            res.render("student/list.hbs", {
                list: docs
            });
        } else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

function handlaValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'father_name':
                body['father_nameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Student.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("student/addOrEdit.hbs", {
                viewTitle: "Update Students",
                student: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/student/list.hbs');
        } else { console.log('Error in employee delete :' + err); }
    });
});
module.exports = router;