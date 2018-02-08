const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
});

const createBody = (registration) => {
  return `
    Beste ${registration.name}, 
    <br><br>
    Bedankt voor het aanmelden. U heeft de volgende gegevens opgegeven:
    <br><br>
    Naam: ${registration.name}
    <br>
    Telefoonnummer: ${registration.phone}
    <br>
    Straat: ${registration.street}
    <br>
    Postcode: ${registration.zipcode}
    <br>
    Aantal personen: ${registration.amount}
    <br><br>
    U ontvangt op xx maart een onbijt.
    <br><br>
    Met vriendelijke groet,
    <br><br>
    Ontbijtactie ploeg
  `;
};

module.exports.sendTo = function(to, registration, cb){
  if(!to) return cb('Incorrect function call');

  console.log(to);
  const mailOptions = {
    from: '"Benjamin van Zwienen" <benjaminvanzwienen@live.nl>',
    to: to,
    subject: 'Ontbijtactie',
    text: 'Bedankt voor het aanmelden.',
    html: createBody(registration),
  };

  transporter.sendMail(mailOptions, cb);
}