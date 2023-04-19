var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var gadget_controller = require('../controllers/gadget');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
// /// gadget ROUTES ///
// // POST request for creating a gadget.
router.post('/gadgets', gadget_controller.gadget_create_post);
// DELETE request to delete gadget.
router.delete('/gadgets/:id', gadget_controller.gadget_delete);
// PUT request to update gadget.
router.put('/gadgets/:id', gadget_controller.gadget_update_put);
// GET request for one gadget.
// router.get('/gadgets/:id', gadget_controller.gadget_create_Page);
router.get('/gadgets/:id', gadget_controller.gadget_detail);
// GET request for list of all gadget items.
router.get('/gadgets', gadget_controller.gadget_list);
/* GET create costume page */
router.get('/create', gadget_controller.gadget_create_Page);
module.exports = router;