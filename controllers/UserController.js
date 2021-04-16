const mongoose = require('mongoose');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.registerUser = async (req, res)=>{
    try {
        const { name, email, password} = req.body;
        // see if user exist
        const user = await User.findOne({email});
        if (user) {
            const errors = [];
            errors.push({message: "This User already exist on our Database"})
            return res.status(400).send({
                success: false,
                errors
            });
        }

        // Get users Gravatar
        const avatar = gravatar.url(email,{
            s: "200",
            r: "pg",
            d: "mm"
        });
        // create an instance of user 
        let newUser = new User({
            name, email, avatar, password
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password,salt);

        // save user
        await newUser.save();

        // JWT
        const payload = {
            user:{
                id: newUser.id
            }
        }
        const token = jwt.sign(payload,config.get('JWT_SECRET'),{
            expiresIn: 360000
        })
        return res.status(200).send({
            success: true,
            message: "User registered successfully",
            newUser,
            token
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            success: false,
            message: 'Server Error',
            data: error.message
        });
    }
}

exports.getLoggedInUser =  async(req, res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        return res.status(200).send({
            success: true,
            user
        })

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            success: false,
            message: 'Server Error',
            data: error.message
        });
    }
}