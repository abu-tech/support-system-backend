const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")
const Note = require("../models/noteModel")

//@desc get notes
//@route GET /api/tickets/:id/notes
//@access private
const getNotes = asyncHandler( async (req, res) => {
    const id = req.params.id
    
    const ticket = await Ticket.findById(id)
    if(req.user.id !== ticket.user.toString()){
        res.status(401)
        throw new Error("Not Authorized")
    }

    const notes = await Note.find({ticket: id})

    res.status(200).json(notes)
})

//@desc create note
//@route POST /api/tickets/:id.notes
//@access private
const createNote = asyncHandler( async (req, res) => {
    const {text} = req.body
    const id = req.params.id

    const ticket = await Ticket.findById(id)
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authorized")
    }

    //using user id in the jwt
     const note = await Note.create({
        ticket: id,
        user: req.user.id,
        text,
        isStaff: false
     })

    res.status(201).json(note)
})

module.exports = {
    getNotes,
    createNote
}