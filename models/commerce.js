const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const CommerceSheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        CIF: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        direction:{
            type: String,  // TODO Guardaremos el hash
        },
        phone:{
            type: Number,
        }
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)

CommerceSheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("Commerce", CommerceSheme)