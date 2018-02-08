const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Registration = require('./models/registration');

const mail = require('./helpers/mail');
const excel = require('./helpers/excel');

require('dotenv').config();

// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on('error', (err) => console.log(err));
mongoose.connection.on('connected', () => console.log('Connected to DB'));

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/overzicht', (req, res) => {
  Registration.find({}, (err, docs) => {
    if(err) return res.render('error');

    res.render('list', {
      registrations: docs
    });
  });
});

app.post('/register', bodyParser.json(), (req, res) => {
  const name = req.body.name || '';
  const phone = req.body.phone || '';
  const street = req.body.street || '';
  const zipcode = req.body.zipcode || '';
  const amount = Number(req.body.amount) || '';
  const email = req.body.email || '';

  if(name && phone && street && zipcode && amount){
    const _registration = {
      name,
      phone,
      street,
      zipcode,
      amount,
      email
    };

    Registration.create(_registration, (err, doc) => {
      if(err) res.json({success: false, error: err});

      res.json({success: true});

      if(_registration.email){
        mail.sendTo(_registration.email, _registration, (err, info) => {
          if(err) console.log(err);
        })
      }
    });
  }else{
    res.json({success: false});
  }
});

app.get('/excel', (req, res) => {
  excel.createFile((err) => {
    if(err) res.render('list');

    res.redirect('overzicht.xlsx');
  })
});

app.listen(8080, () => {
  console.log('App running on http://localhost:8080/');
});