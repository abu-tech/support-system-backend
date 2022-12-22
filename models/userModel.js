const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
   name: {
    type: String,
    required: [true, "please add a name"]
   },
   email: {
    type: String,
    required: [true, "please add an email"],
    unique: true
   },
   password: {
    type: String,
    required: [true, "please add a password"]
   },
   isAdmin: {
    type: Boolean,
    required: true,
    default: false
   }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("User", userSchema)