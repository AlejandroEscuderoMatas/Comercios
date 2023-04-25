const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const UserSheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password:{
            type: String,  // TODO Guardaremos el hash
            select: false  // No se enviara al hacer select
        },
        age: {
            type: Number
        },
        city: {
            type: String,
        },
        interests: {
            type: [String],
            enum: ["cars", "clothes", "sport", "food"]
        },
        accept: {
            type: Boolean
        },
        role:{
            type: String,
            enum: ["user", "admin"], // es el enum de SQL
            default: "user"
        }
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)

UserSheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("User", UserSheme)