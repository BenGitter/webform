const mongoose = require('mongoose');

const RegistrationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  }
});

const Registration = mongoose.model('Registration', RegistrationSchema);

module.exports = Registration;