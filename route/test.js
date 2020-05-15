/**
 * General routes.
 */
"use strict";

const express = require("express");
const router  = express.Router();


/*
FOR TESTING PURPOSES!
*/



//Adds route for the login page.
router.get('/test', (req, res) => res.render('login'));

// Add a route for the path /home
router.get("/test2", (req, res) => res.render("configuration"));

module.exports = router;
