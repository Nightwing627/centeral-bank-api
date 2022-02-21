var express = require('express');
var router = express.Router();
const controller = require('../src/controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/get_data', function(req, res, next) {
  const type = req.body.type;
  if (type == 'cpf') {
    controller.get_cpfs(req, res);
  } else {
    controller.get_cnpjs(req, res);
  }
});

module.exports = router;
