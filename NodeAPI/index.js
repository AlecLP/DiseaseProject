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

//Using Apps and Routes
//======================================================
app.use("/user", userApp)
userApp.use("/", userRoute)
app.use("/doctor", doctorApp)
doctorApp.use("/", doctorRoute)

const port = 9000
console.log("REST API is listening on port: ", port)
app.listen(port)