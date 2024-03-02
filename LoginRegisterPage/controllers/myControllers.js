const bcrypt = require('bcryptjs');

const  myModel = require('../models/myModel');

const getRequest = async (req, res) => {
    res.render('index');
};

const getRegister = (req, res) => {
    res.render('register');
};

const getLogin = async (req, res) => {
    res.render('login');
};

const getRequestLogin = async (req, res) => {
    try {
        const { name, password } = req.body;
        
        const data = await myModel.find({ name: name });

        const user_password = data[0].password;

        bcrypt.compare(password, user_password, (err, result) => {
            console.log(result);

            if (result === true) {
                return res.render('login', {
                    message: 'Access granted'
                })
            } else {
                return res.render('login', {
                    message: 'password or username is incorrect'
                })
            }
        });

    } catch (err) {
        console.log(err);
    }
};

const postRequest = async (req, res) => {
    try {
        const { name, email, password, password_confirm } = req.body;

    const emailExist = await myModel.find({ email: email });

    if (emailExist.length >= 1) {
        return res.render('register', {
            message: 'This email is already in use'
        })
    } else if(password !== password_confirm) {
        return res.render('register', {
            message: 'Passwords do not match!'
        })
    };

    let hashedPassword = await bcrypt.hash(password, 8);

    await myModel.create({ name: name, email: email, password: hashedPassword });

    res.render('register', {
        message: 'User registered!'
   });

    } catch (err) {
        console.log(err)
    }
    
};

module.exports = { getRequest, getRegister, getLogin, getRequestLogin, postRequest };