var express = require('express');
const gadget_controlers= require('../controllers/gadget');
var router = express.Router();

router.get('/', gadget_controlers.gadget_view_all_Page );
module.exports = router;


// router.get('/detail', gadget_controlers.gadget_detail);

router.get('/gadgets', gadget_controlers.gadget_list);

router.get('/detail/', gadget_controlers.gadget_detail);

router.get('/create', gadget_controlers.gadget_create_Page);
router.get('/update', gadget_controlers.gadget_update_Page);
router.get('/delete', gadget_controlers.gadget_delete_Page);
module.exports = router;