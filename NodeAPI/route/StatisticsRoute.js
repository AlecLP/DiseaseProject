let expressObj = require("express")
let statisticsRouter = expressObj.Router({})

let DoctorModel = require("../data-model/DoctorDataModel")
let PatientModel = require("../data-model/PatientDataModel")
let AppointmentModel = require("../data-model/AppointmentDataModel")
const authMiddleware = require("../middleware/AuthMiddleware")

statisticsRouter.get('/api/counts', authMiddleware, async (req, res) => {
    try{
        const doctorCount = await DoctorModel.countDocuments();
        const patientCount = await PatientModel.countDocuments();
        const appointmentCount = await AppointmentModel.countDocuments();

        console.log("Counts: doctors=", doctorCount, ", patients=", patientCount, ", appointments=", appointmentCount)
        res.json({ doctorCount, patientCount, appointmentCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching count statistics" });
    }
})

statisticsRouter.get("/api/common-diseases", authMiddleware, async (req, res) => {
    try{
        const result = await AppointmentModel.aggregate([
            {
              $group: {
                _id: "$diseaseId",
                count: { $sum: 1 }
              }
            },
            {
              $lookup: {
                from: "diseases",
                localField: "_id",
                foreignField: "_id",
                as: "disease"
              }
            },
            { $unwind: "$disease" },
            { $sort: { count: -1 } },
            { $limit: 5 },
            {
              $project: {
                _id: 0,
                diseaseName: "$disease.name",
                severity: "$disease.severity",
                count: 1
              }
            }
        ]);
        console.log("Common Diseases: ", result)
        res.json(result)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching common disease statistics" });
    }
})

module.exports = statisticsRouter