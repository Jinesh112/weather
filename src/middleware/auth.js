const jwt = require("jsonwebtoken");
const registers = require("../models/registers");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verify = jwt.verify(token, process.env.SECRET);
        console.log(verify);

        const user = await registers.findOne({ _id: verify._id })
        console.log(user);

        req.token = token;
        req.user = user;



        next();
    } catch (e) {
        res.status(404).render("404error");
    }

}

module.exports = auth;