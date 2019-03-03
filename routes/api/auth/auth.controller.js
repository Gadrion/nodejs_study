const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

/*
    POST /api/auth/register
    {
        username,
        password
    }
*/
exports.register = (req, res) => {
    const { username, password } = req.body;
    let newUser = null;

    // create a new user if does not exist
    const create = (user) => {
        if(user) {
            throw new Error('username exists');
        } else {
            return User.create(username, password);
        }
    }
    // count the number of the user
    const count = (user) => {
        newUser = user;
        return User.count({}).exec();
    }

    // assign admin if count is 1
    const assign = (count) => {
        if (count === 1) {
            return newUser.assignAdmin()
        } else {
            // if not, return a promise that returns false
            return Promise.resolve(false);
        }
    }

    // respond to the client
    const respond = (isAdmin) => {
        res.json({
            message: 'registered successfully',
            admin: isAdmin
        });
    }

    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
    
    User.findOneByUsername(username)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError)
}

exports.login = (req, res) => {
    const { username, password } = req.body;
    const secret = req.app.get('jwt-secret');

    // check the user info & generate the jwt
        // check the user info & generate the jwt
    const check = (user) => {
        if (!user) {
            // user does not exist
            throw new Error('login failed');
        } else {
            if(user.verify(password)) {
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            username: user.username,
                            admin: user.admin
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: 'gd.com',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err);
                            resolve(token);
                        }
                    )
                });
                return p;
            } else {
                throw new Error('login failed');
            }
        }
    }

    const respond = (token) => {
        res.json({
            message: 'logged in successfully',
            token
        })
    }

    const onError = error => {
        res.status(403).json({
            message: error.message,
        })
    }

    User.findOneByUsername(username)
    .then(check)
    .then(respond)
    .catch(onError)
}

exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}