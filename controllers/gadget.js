var gadget = require('../models/gadget');
// List of all gadgets
exports.gadget_list = async function (req, res) {
    try {
        thegadgets = await gadget.find();
        res.send(thegadgets);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific gadgets.
exports.gadget_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await gadget.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle gadget create on POST.

exports.gadget_create_post = async function (req, res) {
    console.log(req.body)
    let document = new gadget();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"gadgetstype":"goat", "cost":12, "size":"large"}
    document.gadget_type = req.body.gadget_type;
    document.gadget_price = req.body.gadget_price;
    document.gadget_version = req.body.gadget_version;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle gadget delete form on DELETE.
//exports.gadget_delete = function(req, res) {
  //  res.send('NOT IMPLEMENTED: gadget delete DELETE ' + req.params.id);
   //};
exports.gadget_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await gadget.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle gadget update form on PUT.
exports.gadget_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await gadget.findById(req.params.id)
        // Do updates of properties
        if (req.body.gadget_type) toUpdate.gadget_type = req.body.gadget_type;
        if (req.body.gadget_price)toUpdate.gadget_price = req.body.gadget_price;
        if (req.body.gadget_version) toUpdate.gadget_version = req.body.gadget_version;
        if (req.body.gadget ) toUpdate.gadget  = req.body.gadget ;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};


// VIEWS
// Handle a show all view
exports.gadget_view_all_Page = async function (req, res) {
    try {
        thegadgets = await gadget.find();
        res.render('gadget', { title: 'Gadget Search Results', results: thegadgets});
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.gadget_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await gadgets.findById(req.query.id)
        res.render('gadgetdetail',
            { title: 'gadget Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a gadgets.
// No body, no in path parameter, no query.
// Does not need to be async
exports.gadget_create_Page =  function(req, res) {
    console.log("create view")
    try{
        res.render('gadgetcreate', { title: 'gadget Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a gadgets.
// query provides the id
exports.gadget_update_Page =  async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await gadgets.findById(req.query.id)
        res.render('gadgetupdate', { title: 'gadget Update', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.gadget_delete_Page = async function(req, res) {
    console.log("Delete view for id "  + req.query.id)
    try{
        result = await gadgets.findById(req.query.id)
        res.render('gadgetdelete', { title: 'gadget Delete', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};