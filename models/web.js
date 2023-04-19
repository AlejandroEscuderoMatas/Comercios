const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const WebSheme = new mongoose.Schema(
    {
        city: {
            type: String
        },
        activity: {
            type: String
        },
        title:{
            type: String  // TODO Guardaremos el hash
        },
        resume: {
            type: String
        },
        texts: {
            type: [String],
        },
        images: {
            type: [String]
        },
        data:{
            scoring: {
                type: Number,
                default: 0
            },
            scoring_ammount: {
                type: Number,
                default: 0
            },
            reviews: {
                type: [String]
            }
        }
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)

WebSheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("Web", WebSheme)