const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },

    copassword: {
        type: String,
        required: true,
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


registerSchema.methods.generateAuthToken = async function (req, res) {
    try {
        console.log(this._id);
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET);
        console.log(token);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (e) {
        res.status(404).send(e);
    }
}

registerSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.copassword = await bcrypt.hash(this.copassword, 10);
    }
    next();
})





const registers = new mongoose.model("registers", registerSchema);
module.exports = registers;