const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleWare/fetchuser');
const JWT_SECRET = 'secondYearUndergrad';

//create a user using: post "/api/auth". Doesnt require auth
//Route 1
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email id').isEmail(),
    body('password', 'Your password is too short').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    //if there are errors return bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    //check whether the user with same email exits already
    try {
        
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry, a user with same email already exists !" })
        }
        success = true;
        const salt = await bcrypt.genSalt(10);
        secpass = await bcrypt.hash(req.body.password, salt);

        //create a new user
        user = await User.create({
            username: req.body.name,
            password: secpass,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken })

        // .then(user => res.json(user))
        // .catch(err=> {console.log(err)
        // res.json({error: 'Please Enter unique value for email', message: err.message})})
        // })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("error occured");
    }

})


//Authenticate a user
//Route2
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let success = false;
        let user = await User.findOne({ email });
        if (!user) {
            // success = false;
            return res.status(400).json({ error: "Plese login with correct credentials!" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            // success = false;
            return res.status(400).json({ error: "Plese login with correct credentials!" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken })



    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }

})

//Route 3: Get logged in user details, Login reqiured
router.post('/getUser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }
})

module.exports = router