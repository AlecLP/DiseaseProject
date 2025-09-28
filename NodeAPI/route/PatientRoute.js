let expressObj = require("express")
let patientRouter = expressObj.Router({})

let PatiendModel = require("../data-model/PatientDataModel")
const authMiddleware = require("../middleware/AuthMiddleware")

patientRouter.post("/api/save", authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, address, symptoms } = req.body;
  
        const patient = await PatiendModel.findOneAndUpdate(
            { userId },
            { name, email, address, symptoms },
            { new: true, upsert: true }
        );
        console.log("Patient saved: ", patient)
  
        res.status(200).json({ message: "Patient saved successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = patientRouter