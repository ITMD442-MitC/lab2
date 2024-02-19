var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// Route to list all contacts
router.get('/', function(req, res, next) {
    var dataPath = path.join(__dirname, '..', 'data', 'contacts.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            next(err); // pass errors to Express
        } else {
            var contacts = JSON.parse(data);
            res.render('contacts', { title: 'Contacts Database', contacts: contacts });
        }
    });
});

// GET single contact view
router.get('/:id', function(req, res, next) {
    var dataPath = path.join(__dirname, '..', 'data', 'contacts.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        next(err); // pass errors to Express
      } else {
        var contacts = JSON.parse(data);
        var contact = contacts.find(contact => contact.id === req.params.id);
        if (contact) {
          res.render('contact-detail', { title: 'Contact Details', contact: contact });
        } else {
          res.status(404).send('Contact not found');
        }
      }
    });
});

module.exports = router;
