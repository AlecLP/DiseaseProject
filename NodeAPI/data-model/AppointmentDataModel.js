let mongooseObj = require("./Db")
const mongoose = require("mongoose");
schemaObj = mongooseObj.Schema

let appointmentSchema = new schemaObj({
    diseaseId: { type: mongoose.Schema.Types.ObjectId, ref: "disease", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "doctor", required: true },
    day: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
},
{
    versionKey: false
})

let AppointmentModel = mongooseObj.model("appointment", appointmentSchema)
module.exports = AppointmentModel