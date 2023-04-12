var gadget = require('../models/gadget');
// List of all gadgets
exports.gadget_list = async function(req, res) {
 // res.send('NOT IMPLEMENTED: gadget list');
 try{
    thegadgets = await gadget.find();
    res.send(thegadgets);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};

// for a specific gadget.
exports.gadget_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: gadget detail: ' + req.params.id);
};
// Handle gadget create on POST.

// res.send('NOT IMPLEMENTED: gadget create POST');

// Handle gadget create on POST.
exports.gadget_create_post = async function(req, res) {
    console.log(req.body)
    let document = new gadget();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"gadget_type":"goat", "gadget_price":12, "gadget_version":"large"}
    document.gadget_type = req.body.gadget_type;
    document.gadget_price = req.body.gadget_price;
    document.gadget_version = req.body.gadget_version;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };

// Handle gadget delete form on DELETE.
exports.gadget_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: gadget delete DELETE ' + req.params.id);
};
// Handle gadget update form on PUT.
exports.gadget_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: gadget update PUT' + req.params.id);
};


// // List of all gadgets
// exports.gadget_list = async function(req, res) {
//     try{
//     thegadgets = await gadget.find();
//     res.send(thegadgets);
//     }
//     catch(err){
//     res.status(500);
//     res.send(`{"error": ${err}}`);
//     }
//    };



// VIEWS
// Handle a show all view
exports.gadget_view_all_Page = async function(req, res) {
    try{
    thegadgets = await gadget.find();
    res.render('gadget', { title: 'Gadget Search Results', results: thegadgets });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };