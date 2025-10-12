let expressObj = require("express")
const mongoose = require("mongoose");
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

appointmentRouter.get('/api/patient-latest-appointments', authMiddleware, async (req, res) => {
  const userId = req.user._id;
  const isAdmin = req.user.role === 'Admin';

  try {
    const result = await AppointmentModel.aggregate([
      { $match: isAdmin ? {} : { userId: new mongoose.Types.ObjectId(userId) } },
      //Group by userId to find latest appointment date and its diseaseId
      {
        $group: {
          _id: {
            userId: "$userId",
            diseaseId: "$diseaseId"
          },
          latestAppointment: { $max: "$date" },
        }
      },
      //Lookup patient info directly by userId
      {
        $lookup: {
          from: "patients",
          localField: "_id.userId",
          foreignField: "userId",
          as: "patient"
        }
      },
      //Lookup disease info from diseaseId
      {
        $lookup: {
          from: "diseases",
          localField: "_id.diseaseId",
          foreignField: "_id",
          as: "disease"
        }
      },
      { $unwind: "$patient" },
      { $unwind: "$disease" },
      {
        $project: {
          patientName: "$patient.name",
          diseaseName: "$disease.name",
          severity: "$disease.severity",
          latestAppointment: 1
        }
      },
      { $sort: { latestAppointment: -1 } }
    ]);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching patient summary" });
  }
});

module.exports = appointmentRouter