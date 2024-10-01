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
    console.log("localhost://3000");
}).catch((err) => {
    console.log("Error in Connecting to Database", err);
});

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phno: String,
    gender: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post("/sign_up", async (req, res) => {
    const { name, age, email, phno, gender, password } = req.body;

    const data = new User({
        name,
        age,
        email,
        phno,
        gender,
        password
    });

    try {
        await data.save();
        console.log("Record Inserted Successfully");
        return res.redirect('signup_successful.html');
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