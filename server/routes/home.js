const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const homeLayout = '../views/layouts/home';
const jwtSecret = process.env.JWT_SECRET;
/**
 * Home - Login Page
*/
router.get('', async (req, res) =>{
    try {
        const locals = {
            title: "Preskilet Blog",
            description: "This is a Home Page"
        }

        res.render('home/index', {locals, layout: homeLayout});
    } catch (error) {
        console.log(error);
    }
});


/**
 * Home - Check Login
*/
router.post('/home', async (req, res) =>{
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});

        if (!user){
            return res.status(401).json ({ message: 'Invalid Credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json ({ message: 'Invalid Credentials'});
        }

        const token = jwt.sign({ userId: user._id}, jwtSecret );
        res.cookie('token', token, {httpOnly: true});
        res.redirect('/blogs');



    } catch (error) {
        console.log(error);
    }
});


/**
 * POST - User Register
*/
router.post('/register', async (req, res) =>{
    try {
        const { username, password, firstName, middleName, surname, email, college, otherCollege, profilePhoto } = req.body;
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            // user.findOne 
            const user = await User.create({ username, password:hashedPassword,  firstName, middleName, surname, email, college, otherCollege, profilePhoto});
            res.render("UserRegistered");
        } catch (error) {
            if(error.code === 11000) {
                res.status(409).json({message: 'User already in use'});
            }
            console.log(error)
            res.status(500).json({message: 'Internal server error'})
        }
    } catch (error) {
        console.log(error);
    }
});




module.exports = router;
