let mongooseObj = require("./Db")
const mongoose = require("mongoose");
schemaObj = mongooseObj.Schema

let reviewSchema = new schemaObj({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "doctor", required: true },
    rating: {type: Number, required: true},
    review: {type: String, required: true},
},
{
    versionKey: false
})

let ReviewModel = mongooseObj.model("review", reviewSchema)

module.exports = ReviewModel