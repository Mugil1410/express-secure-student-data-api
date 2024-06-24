const session = require('express-session');

const configSession=session({
    secret: 'Mugil',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
})

module.exports=configSession;