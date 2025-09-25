let mongooseObj = require("./Db")
const mongoose = require("mongoose");
schemaObj = mongooseObj.Schema

let doctorSchema = new schemaObj({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    name: {type: String, required: true},
    contact: {type: String, required: true},
    specialty: {type: String, required: true},
    experience: {type: Number, required: true},
    availability: {
        type: [String],
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true
    },
    fees: { type: Number, required: true }
},
{
    versionKey: false
})

let DoctorModel = mongooseObj.model("doctor", doctorSchema)
module.exports = DoctorModel