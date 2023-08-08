require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const path = require("path");
const bcrypt = require("bcrypt");
const registers = require("../src/models/registers");
const cookie = require("cookie-parser");
const db = require("../src/db/conn");
const staticPath = path.join(__dirname, "../public");
const tempPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", tempPath);
hbs.registerPartials(partialPath);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie());
const auth = require("../src/middleware/auth");


app.get("/", (req, res) => {
    res.render("index.hbs");
})

app.get("/weather", auth, (req, res) => {
    res.render("weather.hbs");
})

app.get("/about", (req, res) => {
    res.render("about.hbs");
})

app.get("/register", (req, res) => {
    res.render("register.hbs");
})

app.get("/login", (req, res) => {
    res.render("login.hbs");
})


app.get("/logout", auth, async (req, res) => {
    try {
        console.log(req.user);


        // logout 1 user
        // req.user.tokens = req.user.tokens.filter((currenttoken) => {
        //     return currenttoken.token !== req.token;
        // })

        // logout all user
        req.user.tokens = [];
        res.clearCookie("jwt");
        console.log("logout successfully.");
        await req.user.save();
        res.render("login");
    } catch (e) {
        res.status(404).send(e);
    }
})

app.get("*", (req, res) => {
    res.render("404error.hbs", {
        error: "OOPS!Page not found."
    });
})

app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const copassword = req.body.copassword;

        if (password === copassword) {
            const data = new registers({
                username: req.body.username,
                email: req.body.email,
                password: password,
                copassword: copassword
            })
            console.log(`the success part ${data}`);
            const token = await data.generateAuthToken();
            console.log(`the token part is ${token}`);

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30000),
                httpOnly: true
            })
            console.log(cookie);

            const newData = await data.save();
            console.log(newData);
            res.status(201).render("index");
        } else {
            res.send("invalid");
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(`kuch kuch ${err}`);
    }
})

app.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const name = await registers.findOne({ username: username });

        const isMatch = await bcrypt.compare(password, name.password);
        const token = await name.generateAuthToken();
        console.log(`the token part is ${token}`);
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 3000000),
            httpOnly: true
        });
        if (isMatch) {
            res.status(201).render("index");
        } else {
            res.send("<h1>invalid</h1>");
        }
    } catch (e) {
        console.log(e);
        res.status(404).send("e");
    }
})




app.listen(port, () => {
    console.log(`listing to the ${port}`);
});