var express = require('express');
const gadget_controlers= require('../controllers/gadget');
var router = express.Router();
/* GET gadgets */
router.get('/', gadget_controlers.gadget_view_all_Page );
module.exports = router;



//var express = require('express');
//var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
  //res.render('gadget', { title: 'Search Results'});
//});

//module.exports = router;