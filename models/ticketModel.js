const mongoose = require("mongoose")
const { Schema } = mongoose

const ticketSchema = new Schema({
   user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
   },
   product: {
    type: String,
    required: [true, "please Select a product"],
    enum: ['iphone', 'macbook pro', 'ipod', 'air pods']
   },
   description: {
    type: String,
    required: [true, "please add a description of the issue"]
   },
   status: {
    type: String,
    required: true,
    enum: ['new', 'open', 'closed'],
    default: 'new'
   }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Ticket", ticketSchema)