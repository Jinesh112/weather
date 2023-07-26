const express = require("express");
const app = express();
const port = 3000;
const hbs = require("hbs");
const path = require("path");

// first we use handlesbar(hbs){hbs(view)}...after we change the
//  name views to templates and adding partials to the templates
const staticPath = path.join(__dirname, "../public");
const tempPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.use(express.static(staticPath));

// for name change (views to templates.)
app.set("veiw engine", "hbs");
app.set("views", tempPath);

// for register partials
hbs.registerPartials(partialPath);

// use hbs so res.render instead of res.send
app.get("/", (req, res) => {
    res.render("index.hbs")
});

app.get("/weather", (req, res) => {
    res.render("weather.hbs")
});

app.get("/about", (req, res) => {
    res.render("about.hbs")
});

app.get("*", (req, res) => {
    res.render("404error.hbs", {
        error: "OOPS!Page not found."
    })
});

app.listen(port, () => {
    console.log(`listing to the ${port}`);
});