require("dotenv").config();
let express = require("express")
const app = express()

const cors = require("cors")

globalThis.rootPath = __dirname

const origins = [
    "http://localhost:4200"
]
app.use(cors({origin: origins}))
app.use(express.json({limit: "2mb", extended: false}))

//Apps and Routes
//======================================================
const userApp = express()
const userRoute = require("./route/UserRoute")
const doctorApp = express()
const doctorRoute = require("./route/DoctorRoute")
const diseaseApp = express()
const diseaseRoute = require("./route/DiseaseRoute")
const patientApp = express()
const patientRoute = require("./route/PatientRoute")
const appointmentApp = express()
const appointmentRoute = require("./route/AppointmentRoute")
const reviewApp = express()
const reviewRoute = require("./route/ReviewRoute")
const statisticsApp = express()
const statisticsRoute = require("./route/StatisticsRoute")

//Using Apps and Routes
//======================================================
app.use("/user", userApp)
userApp.use("/", userRoute)
app.use("/doctor", doctorApp)
doctorApp.use("/", doctorRoute)
app.use("/disease", diseaseApp)
diseaseApp.use("/", diseaseRoute)
app.use("/patient", patientApp)
patientApp.use("/", patientRoute)
app.use("/appointment", appointmentApp)
appointmentApp.use("/", appointmentRoute)
app.use("/review", reviewApp)
reviewApp.use("/", reviewRoute)
app.use("/statistics", statisticsApp)
statisticsApp.use("/", statisticsRoute)

const port = 9000
console.log("REST API is listening on port: ", port)
app.listen(port)