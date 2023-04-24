var express = require('express');
const gadget_controlers= require('../controllers/gadget');
var router = express.Router();

router.get('/', gadget_controlers.gadget_view_all_Page );
module.exports = router;
// router.get('/detail', gadget_controlers.gadget_detail);

router.get('/gadgets', gadget_controlers.gadget_list);

router.get('/detail/', gadget_controlers.gadget_detail);


// A little function to check if we have an authorized user and continue on
//or
// redirect to login.
const secured = (req, res, next) => {
 if (req.user){
 return next();
 }
 req.session.returnTo = req.originalUrl;
 res.redirect("/login");
 }
router.get('/update', secured,gadget_controlers.gadget_update_Page);
router.get('/delete',secured, gadget_controlers.gadget_delete_Page);
router.get('/create',secured, gadget_controlers.gadget_create_Page);
module.exports = router;