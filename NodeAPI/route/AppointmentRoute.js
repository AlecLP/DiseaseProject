let expressObj = require("express")
let appointmentRouter = expressObj.Router({})

let AppointmentModel = require("../data-model/AppointmentDataModel")
const authMiddleware = require("../middleware/AuthMiddleware")

appointmentRouter.post("/api/save", authMiddleware, async (req, res) => {
    let appointmentData = req.body
    try {
        let appointmentDataObj = new AppointmentModel(appointmentData)
        appointmentDataObj.save()
        .then((newAppointment) => {
            console.log("Sucessfully scheduled appointment: ", newAppointment)
            return res.status(201).send({message: "Sucessfully scheduled appointment."})
        }).catch((err) => {
            console.log("ERROR: Error scheduling appointment: ", err)
            return res.status(500).send({message: "Error scheduling appointment."})
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = appointmentRouter