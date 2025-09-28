let mongooseObj = require("./Db")
const mongoose = require("mongoose");
schemaObj = mongooseObj.Schema

let patientSchema = new schemaObj({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    symptoms: {type: String, required: true},
},
{
    versionKey: false
})

let PatientModel = mongooseObj.model("patient", patientSchema)
module.exports = PatientModel