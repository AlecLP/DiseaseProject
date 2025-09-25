let expressObj = require("express")
let userRouter = expressObj.Router({})

let UserModel = require("../data-model/UserDataModel")
const jwt = require("jsonwebtoken")

userRouter.post("/api/register", (req, res) => {
    let userData = req.body
    console.log("Regstering user: ", userData)
    UserModel.findOne({username: userData.username})
    .then((existingUser) => {
        if(existingUser){
            console.log("ERROR: Username already exists.")
            return res.status(409).send({ message: 'Username already exists' });
        }
        else{
            let userDataObj = new UserModel(userData)
            userDataObj.save()
            .then((newUser) => {
                console.log("Sucessfully registered user: ", newUser)
                return res.status(201).send({message: "Sucessfully registered user."})
            }).catch((err) => {
                console.log("ERROR: Error saving user to database: ", err)
                return res.status(500).send({message: "Error saving user to database."})
            })
        }
    }).catch((err) => {
        console.log("ERROR: Server error: ", err)
        return res.status(500).send({message: "Server error"})
    })
})

userRouter.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const existingUser = await UserModel.findOne({ username, password });
      if (!existingUser) {
        console.log("ERROR: Invalid credentials.");
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      const payload = { _id: existingUser._id, username: existingUser.username, role: existingUser.role };
      
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      console.log("Login successful.");
      return res.status(200).json({
        token
      });
    } catch (err) {
      console.log("ERROR: Server error: ", err);
      return res.status(500).json({ message: "Server error" });
    }
});

module.exports = userRouter