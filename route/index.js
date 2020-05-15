/**
 * General routes.
 */
"use strict";

const restApi = require('../restapi_interactor/index.js');
const express = require("express");
const router  = express.Router();

//Adds route for the login page.
router.get('/', (req, res) => {

    res.render('login')

});

// Add a route for the path /home
router.get("/home", (req, res) => res.render("home"));

router.get("/history", (req, res) => res.render("history"));

//Route for configuration page
router.get("/configuration", (req, res) => res.render("configuration"));

//Route for about page
router.get("/about", (req, res) => res.render("about"));

router.post('/', (req, res) => {
    restApi.login(req.body).then(status => {
        if(status == '200'){
            res.render('home');
        }else{
            res.render('login');
        }
    });
    
})

router.get('/workout', (req, res) => {
    restApi.fetchWorkout(1).then(workout => {
        console.log(workout);
    })
})

module.exports = router;
