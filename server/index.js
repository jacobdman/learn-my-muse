require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const controller = require('./controller');
const massive = require('massive');
const cors = require('cors');

const app = express();
massive( process.env.CONNECTION_STRING ).then( dbInstance => { app.set('db', dbInstance) });
app.use( session({
    secret: 'Sp00ky seeeecr3t',
    resave: false,
    saveUninitialized: false
}));

app.use( passport.initialize() );
app.use( passport.session() );

app.use( bodyParser.json());
app.use( cors() );

passport.use( new Auth0Strategy ({
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/login',
    scope: "openid email profile",
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        done(null, profile)
    })
)

passport.serializeUser(function (user, done) {
    done(null, { id: user.id, display: user.displayName, name: user.name, nickname: user.nickname, email: user.emails[0].value, picture: user.picture })
})

passport.deserializeUser(function (obj, done) {
    done(null, obj)
})

app.get('/login', passport.authenticate('auth0', {
        successRedirect: 'http://localhost:3000/#/results', failureRedirect: 'http://localhost:3000/#/', failureFlash: false
    })
)

const authenticated = (req,res,next) => {
    if (req.user && req.user !== null) {
        next()
    } else {
        res.sendStatus(401)
    }
}

app.get('/api/loginUser', authenticated, (req,res,next) => {
    console.log(req.user)
    res.status(200).send(JSON.stringify(req.user, null, 10))
})

app.get('/api/logout', (req, res) => {
    req.logout()
    req.session.destroy()
    res.redirect('http://localhost:3000/#/results');
    console.log(req.user)
})

app.get('/api/search/', controller.searchTeachers)
app.get('/api/searchNew/', controller.searchWithNewParams)
app.get('/api/getTeacher/:id', controller.getTeacher)
app.get('/api/getReviews/:id', controller.getReviews)
app.get('/api/getReviewsSpecific/:id', controller.getReviewsSpecific)
app.post('/api/postTeacherCoordinates/:id', controller.postTeacherCoordinates)

let PORT = process.env.PORT || 4000;
app.listen(PORT, () => {console.log(`Listening on port: ${PORT}`);});