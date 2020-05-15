/**
 * General routes.
 */
"use strict";

const express = require("express");
const router  = express.Router();

//Route for /
router.get('/', (req, res) => res.render('login'));

// Add a route for the path /home
router.get("/home", (req, res) => res.render("home"));


module.exports = router;
