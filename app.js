const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const multer = require("multer")




const Product = require("./models/product")
const User = require("./models/user")



const PORT = 3000


const dbUrl = "mongodb://127.0.0.1:27017/Products"

const app = express()
// const Products = []
mongoose.connect(dbUrl).then((result) => {
    console.log("connected")
}).catch((error) => {
    console.log(error)
})
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }

})


app.use(multer({storage: fileStorage}).single('image'))


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.use("/uploads", express.static(__dirname + '/uploads'));



app.get("/", (req, res) => {
    
    Product.find({}).then((data)=>{
        res.render("index", { products: data })
    })
})
app.get("/post", (req, res) => {
    
    res.redirect("/login")
})
app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    // console.log(email)
    User.findOne({password:password}).then((user) => {
        if (!user) {
            console.log('no user ')
            res.redirect("/login")
        }
        else {
            // console.log(user.email)
            // console.log(email)
            // console.log(email === user.email)
            if (user.email === email) {
                console.log("ok")
                res.render("post")
                
            }
        }
    }).catch((error) => {
        console.log(error)
    })

    // res.render("post")
    
})
app.get("/signup", (req, res) => {
    res.render("signup")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/signup", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const rePassword = req.body.password
    if (password === rePassword) {
        const user = new  User({
            email: email,
            password:password

        })
        user.save().then((data) => {
            res.render("login")
        })
    }
})
app.post("/post", (req, res) => {
    const price = req.body.price
    const image = req.file.filename

    const furnitureName = req.body.furnitureName
    console.log(image)
    const prod = new Product(
        {
        imageUrl:image,
        price: price,
        furnitureName: furnitureName
   }
    ).save().then((data)=> {
        console.log("data is saved")
    }).catch((error) => {
        console.log(error)
    })
    res.render("post")
})

app.get("*", (req, res) => {
    res.render("404")
})

app.listen(PORT, ()=> {
    console.log("server running")
    
})