let expressObj = require("express")
let reviewRouter = expressObj.Router({})

let ReviewModel = require("../data-model/ReviewDataModel")
const authMiddleware = require("../middleware/AuthMiddleware")

reviewRouter.post("/api/save", authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const { doctorId, rating, review } = req.body;
  
        const foundReview = await ReviewModel.findOneAndUpdate(
            { userId, doctorId },
            { rating, review },
            { new: true, upsert: true }
        );
        console.log("Review saved: ", foundReview)
  
        res.status(200).json({ message: "Review saved successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

reviewRouter.get("/api/reviews/:doctorId", async (req, res) => {
    try {
        const { doctorId } = req.params;

        const reviews = await ReviewModel.find({ doctorId })

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this doctor" });
        }

        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = reviewRouter