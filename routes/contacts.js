var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var { v4: uuidv4 } = require('uuid'); // UUID package to generate unique IDs

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

// Display the form to create a new contact
router.get('/create', function(req, res, next) {
    res.render('create-contact', { title: 'Create Contact' });
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

// POST route for deleting a contact
router.post('/:id/delete', function(req, res, next) {
    var dataPath = path.join(__dirname, '..', 'data', 'contacts.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            next(err);
        } else {
            var contacts = JSON.parse(data);
            var filteredContacts = contacts.filter(contact => contact.id !== req.params.id);
            fs.writeFile(dataPath, JSON.stringify(filteredContacts, null, 2), (err) => {
                if (err) {
                    next(err);
                } else {
                    res.redirect('/contacts');
                }
            });
        }
    });
});

// Process the form submission and create a new contact
router.post('/create', function(req, res, next) {
    var dataPath = path.join(__dirname, '..', 'data', 'contacts.json');
    var newContact = {
      id: uuidv4(), // Generate a unique ID for the contact
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim(),
      notes: req.body.notes.trim(),
      timestamp: new Date().toISOString()
    };
  
    // Read existing contacts, add the new one, then save
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        next(err);
      } else {
        var contacts = JSON.parse(data);
        contacts.push(newContact);
        fs.writeFile(dataPath, JSON.stringify(contacts, null, 2), (err) => {
          if (err) {
            next(err);
          } else {
            res.redirect('/contacts');
          }
        });
      }
    });
  });

module.exports = router;
