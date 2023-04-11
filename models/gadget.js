const mongoose = require("mongoose")
const gadgetSchema = mongoose.Schema({
    gadget_type: String,
    gadget_price: Number,
    gadget_version: String
})
module.exports = mongoose.model("gadget",gadgetSchema)