let mongooseObj = require("./Db")
schemaObj = mongooseObj.Schema

let userSchema = new schemaObj({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type :String, required: true}
},
{
    versionKey: false
})

let UserModel = mongooseObj.model("user", userSchema)

module.exports = UserModel