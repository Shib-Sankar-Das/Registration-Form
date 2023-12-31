
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const env = require("dotenv").config();

const app = express();

const path = require('path');

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('public/image'));
app.use(bodyParser.urlencoded({
    extended: true
}));

const mySecret = process.env['MONGODB_URL']
console.log(mySecret);
mongoose.connect(mySecret)
var db = mongoose.connection;
db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

app.get('/loginpage', (req, res) => {
    console.log('login');
});

app.post("/sign_up", (req, res) => {
    console.log(req.body);
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phno = req.body.phno;
    var gender = req.body.gender;
    var password = req.body.password;

    var data = {
        "Name": name,
        "Age": age,
        "Email": email,
        "phno": phno,
        "gender": gender,
        "Password": password
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_successful.html');
});

app.post("/login", async (req, res) => {
    console.log(req.body);
    var email = req.body.loginemail;
    var password = req.body.passwordlogin;

    try {
        const user = await db.collection('users').findOne({ Email: email });
        console.log(password === user.Password);

        if (!user) {
            return res.redirect('login_fail.html');
        }

        // Compare the provided password with the stored password
        if (password === user.Password) {
            return res.render('index', {
                pageTitle: 'Welcome',
                message: user.Name
            });
        } else {
            return res.redirect('login_fail.html');
        }
    } catch (error) {
        console.error(error);
        return res.send('Internal Server Error');
    }
});

app.get("/", (req, res) => {
    res.send({
        "Allow-acces-Allow-Origin": '*'
    });
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on port 3000");
