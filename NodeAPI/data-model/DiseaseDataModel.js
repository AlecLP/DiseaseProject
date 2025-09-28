let mongooseObj = require("./Db")
const mongoose = require("mongoose");
schemaObj = mongooseObj.Schema

let diseaseSchema = new schemaObj({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    name: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    symptoms: {type: String, required: true},
    severity: {
        type: String,
        enum: ["Mild", "Moderate", "Severe"],
        required: true
    }
},
{
    versionKey: false
})

let DiseaseModel = mongooseObj.model("disease", diseaseSchema)
module.exports = DiseaseModel