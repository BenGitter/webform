const path = require('path');
const fs = require('fs');

const Excel = require('exceljs');
const Registration = require('../models/registration');

module.exports.createFile = function(cb){
  let workbook = new Excel.Workbook();
  workbook.creator = 'Me';
  workbook.created = new Date();

  let worksheet = workbook.addWorksheet('Blad1');
  worksheet.addRow(["Naam", "Telefoonnummer", "Straatnaam", "Postcode", "Aantal", "Emailadres"]);
  worksheet.getRow(1).font = { bold: true };

  for(let i = 1; i < 7; i++){
    worksheet.getRow(1).getCell(i).border = {
      bottom: {
        style: 'medium',
        color: { argb: '00000000' }
      }
    }
  }

  worksheet.getColumn(1).width = 30;
  worksheet.getColumn(2).width = 15;
  worksheet.getColumn(3).width = 50;
  worksheet.getColumn(4).width = 10;
  worksheet.getColumn(5).width = 10;
  worksheet.getColumn(6).width = 35;

  Registration.find({}, (err, docs) => {
    if(err) return cb(true);

    docs.forEach((doc, i) => {
      worksheet.addRow([doc.name, doc.phone, doc.street, doc.zipcode, doc.amount, doc.email]);
    });

    workbook.xlsx.writeFile('./public/overzicht.xlsx')
      .then(() => {
        return cb(false);
      });
    
  });

}