let expressObj = require("express")
let diseaseRouter = expressObj.Router({})

let DiseaseModel = require("../data-model/DiseaseDataModel")
const authMiddleware = require("../middleware/AuthMiddleware")

diseaseRouter.post("/api/save", authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, category, description, symptoms, severity } = req.body;
  
        const disease = await DiseaseModel.findOneAndUpdate(
            { name, severity },
            { userId, category, description, symptoms, severity },
            { new: true, upsert: true }
        );
        console.log("Disease saved: ", disease)
  
        res.status(200).json({ message: "Disease saved successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

diseaseRouter.get("/api/getDiseases", authMiddleware, async (req, res) => {
    console.log("Getting diseases...")
    DiseaseModel.find()
    .then((diseases)=>{
        console.log("Found diseases: ", diseases)
        res.status(200).send(diseases)
    })
    .catch((err)=>{
        console.log("Error while fetching diseases: ", err)
        res.status(500).send("Error while fetching diseases")
    })
})

module.exports = diseaseRouter