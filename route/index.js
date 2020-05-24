/**
 * General routes.
 */
"use strict";

const auth = require('../auth/authentication.js');
const workoutScripts = require('../public/js/workout.js');
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

//Route for the history page
router.get("/history", auth.authUser, (req, res) => {
    restApi.fetchWorkouts().then((response) => {
        if(response.status == '200'){
            console.log(response.data.workouts);
            let data = {};
            data.workouts = response.data.workouts;
            data.data = response.data;
            res.render("history", data);
        }
    })
});

//Route for configuration page
router.get("/configuration", auth.authUser, (req, res) => res.render("configuration"));

//Route for about page
router.get("/about", auth.authUser, (req, res) => res.render("about"));

//Route for admin page
router.get('/admin', (req, res) => {

})

//Login handling
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

module.exports = router;
