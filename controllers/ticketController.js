const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")

//@desc get tickets
//@route GET /api/tickets
//@access private
const getTickets = asyncHandler( async (req, res) => {
    //using user id in the jwt
    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})

//@desc get ticket
//@route GET /api/tickets/:id
//@access private
const getTicket = asyncHandler( async (req, res) => {
    //using user id in the jwt
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error("Ticket not found!")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authorized")
    }

    res.status(200).json(ticket)
})

//@desc create tickets
//@route POST /api/tickets
//@access private
const createTicket = asyncHandler( async (req, res) => {
    const {product, description} = req.body

    //using user id in the jwt
     const ticket = await Ticket.create({
        user: req.user.id,
        product,
        description,
        status: 'new'
     })

    res.status(201).json(ticket)
})

//@desc delete tickets
//@route DELETE /api/tickets/:id
//@access private
const deleteTicket = asyncHandler( async (req, res) => {
    //using user id in the jwt
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error("Ticket not found!")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authorized")
    }

    await ticket.remove()

    res.status(200).json({sucess: true})
})

//@desc update tickets
//@route PUT /api/tickets/:id
//@access private
const updateTicket = asyncHandler( async (req, res) => {
    //using user id in the jwt
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error("Ticket not found!")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authorized")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new : true})

    res.status(201).json(updatedTicket)
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket, 
    updateTicket
}