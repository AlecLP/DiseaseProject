let expressObj = require("express")
let doctorRouter = expressObj.Router({})

let DoctorModel = require("../data-model/DoctorDataModel")
const authMiddleware = require("../middleware/AuthMiddleware")

doctorRouter.post("/api/save", authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, contact, specialty, experience, availability, fees } = req.body;
  
        const doctor = await DoctorModel.findOneAndUpdate(
            { userId },
            { name, contact, specialty, experience, availability, fees },
            { new: true, upsert: true }
        );
        console.log("Doctor saved: ", doctor)
  
        res.status(200).json({ message: "Doctor saved successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

doctorRouter.get("/api/specialty/:specialty", authMiddleware, async (req, res) => {
    try {
      const { specialty } = req.params;
  
      // Case-insensitive search
      const doctors = await DoctorModel.find({
        specialty: { $regex: new RegExp("^" + specialty + "$", "i") },
      });

      console.log("Doctors: ", doctors)
  
      if (!doctors.length) {
        return res.status(404).json({ message: "No doctors found that are specialized in that disease." });
      }
  
      res.json(doctors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
});

doctorRouter.get("/api/findAll", authMiddleware, async (req, res) => {
  DoctorModel.find()
    .then((doctors)=>{
        console.log("Found doctors: ", doctors)
        res.status(200).send(doctors)
    })
    .catch((err)=>{
        console.log("Error while fetching doctors: ", err)
        res.status(500).send("Error while fetching doctors")
    })
})

module.exports = doctorRouter