var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

const path = require('path');

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on("error",() => HTMLFormControlsCollection.log("Error in Connecting to Database"))
db.once("open",() => console.log("Connected to Database"))


app.get('/loginpage', (req,res) => {
    console.log('login')
})


app.post("/sign_up",(req,res) => {
    console.log(req.body);
    var name = req.body.name
    var age=req.body.age
    var email=req.body.email
    var phno=req.body.phno
    var gender=req.body.gender
    var password=req.body.password

    var data={
        "Name":name,
        "Age":age,
        "Email":email,
        "phno":phno,
        "gender":gender,
        "Password":password
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signup_successful.html')
})

app.post("/login", async (req, res) => {
    console.log(req.body);
    var email = req.body.loginemail
    var password = req.body.passwordlogin

    try {
        const user = await db.collection('users').findOne({ Email: email })
        console.log(user);

        if (!user) {
            return res.send('User not found!')
        }

        // compare the password with hashed password stored in our database
        if (password == user['Password']) {
            res.render('index', {
                pageTitle:'welcome',
                message:user.Name
            });
        }

        return res.send('User name or password wrong')
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
})

app.get("/",(req,res) => {
    res.send({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000")
