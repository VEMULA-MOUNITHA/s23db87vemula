const mongoose = require("mongoose")
const gadgetSchema = mongoose.Schema({
    gadget_type:{
        type: String,
        required: [true, "Name required"]
    },
    gadget_price:{
        type: Number,
        min: [9, "Min value is 9"],
        max: [200, "Max value is 200"]
    },
    gadget_version: String
})
module.exports = mongoose.model("gadget",gadgetSchema)