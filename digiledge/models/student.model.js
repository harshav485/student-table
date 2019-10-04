const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    father_name: {
        type: String
    },
    Roll_number: {
        type: String
    },
    Mobile: {
        type: String
    }
});

var Student = module.exports = mongoose.model('Student', studentSchema);


//get students
module.exports.getStudents = function(callback, limit) {
    Student.find(callback).limit(limit);
}

// Add students
module.exports.addStudents = function(student, callback) {
    Student.create(student, callback);
}

// Update student
module.exports.updateStudent = (id, student, options, callback) => {
    var query = { _id: id };
    var update = {
        fullName: student.fullName,
        father_name: student.father_name,
        Roll_number: student.Roll_number,
        Mobile: student.Mobile
    }
    Student.findOneAndUpdate(query, update, options, callback);
}


// Delete student
module.exports.removeStudent = (id, callback) => {
    var query = { _id: id };
    Student.remove(query, callback);
}

//get student by id
module.exports.getStudentById = function(id, callback) {
    Student.findById(id, callback);
}