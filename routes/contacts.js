var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET contacts listing. */
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

module.exports = router;
