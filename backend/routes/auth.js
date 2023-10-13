const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'vishalisagoodb$oy';

//ROUTE 1: Create a user using: POST "/api/auth/createuser" No login required
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
    body('email').isEmail()
], async (req, res) => {
    let success = false;
    const result = validationResult(req); //Checking if it is a bad POST request
    if (result.isEmpty()) {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "An account with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        const useremail = user.email;
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ useremail, success, authToken });
        return;
    }

    res.send({ errors: result.array() });
})

//ROUTE 2: Authenticate a user using: POST "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').notEmpty()
], async (req, res) => {
    let success = false;
    const result = validationResult(req); //Checking if it is a bad POST request
    if (result.isEmpty()) {
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Enter valid credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Enter valid credentials" });
            }

            const useremail = user.email;
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.header("Access-Control-Allow-Origin", "*");
            return res.json({ useremail, success, authToken });

        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Internal Server Error");
        }
    }

    res.send({ errors: result.array() });

})

//ROUTE 3: Get logged in user's details using :   POST "/api/auth/getuser" Login required
router.post('/getuser', fetchuser, async (req, res) => {
try {
    let userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
} catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
}
})

module.exports = router;