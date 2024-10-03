var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/Database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to Database");
    console.log("http://localhost:3000");
}).catch((err) => {
    console.log("Error in Connecting to Database", err);
});

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    dob: Number,
    age: Number,
    email: String,
    phno: String,
    gender: String,
    Reg_No: String
});

const User = mongoose.model('User', userSchema);

app.post("/sign_up", async (req, res) => {
    const { first_name,last_name,dob, age, email, phno, gender, Reg_No } = req.body;

    const data = new User({
        first_name,
        last_name,
        dob,
        age,
        email,
        phno,
        gender,
        Reg_No
      });

    try {
        await data.save();
        console.log("Record Inserted Successfully");
        return res.redirect('com.html');
    } catch (err) {
        console.error("Error in Inserting Record:", err);
        res.status(500).send("Error in signing up");
    }
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('index.html');
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});