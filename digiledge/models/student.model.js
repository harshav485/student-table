const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: "this field is required"
    },
    father_name: {
        type: String,
        required: "this field is required"

    },
    Roll_number: {
        type: String
    },
    Mobile: {
        type: String
    }
});

mongoose.model('Student', studentSchema);