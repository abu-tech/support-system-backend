const express = require('express')
const router = express.Router()
const {protect} = require("../middleware/authMiddleware")
const {getTickets, getTicket, createTicket, updateTicket, deleteTicket} = require("../controllers/ticketController")
const noteRouter = require("./noteRoutes")

//re-route into note router
router.use("/:id/notes", noteRouter)

router.route("/").get(protect, getTickets).post(protect, createTicket)

router.route("/:id").get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router