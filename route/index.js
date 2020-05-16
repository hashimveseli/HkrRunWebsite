/**
 * General routes.
 */
"use strict";

const auth = require('../auth/authentication.js');
const restApi = require('../restapi_interactor/index.js');
const express = require("express");
const router  = express.Router();

//Adds route for the login page.
router.get('/', (req, res) => {

    res.render('login')

});

// Add a route for the path /home
router.get("/home", auth.authUser, (req, res) => {
    
    res.render('home');
});

router.get("/history", auth.authUser, (req, res) => res.render("history"));

//Route for configuration page
router.get("/configuration", auth.authUser, (req, res) => res.render("configuration"));

//Route for about page
router.get("/about", auth.authUser, (req, res) => res.render("about"));

router.post('/', (req, res) => {
    restApi.login(req.body).then(response => {
        if(response.status == '200'){
            let sess = req.session;
            sess.token = response.data.token;
            console.log(sess.token);
            res.render('home');
        }else{
            res.render('login');
        }
    });
    
})

router.get('/workout', auth.authUser, (req, res) => {
    restApi.fetchWorkout(1).then(workout => {
        console.log(workout);
    })
})

module.exports = router;
