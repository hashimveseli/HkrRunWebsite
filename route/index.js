/**
 * General routes.
 */
"use strict";

const express = require("express");
const router  = express.Router();

// Add a route for the path /
// router.get("/", (req, res) => {
//     res.send("Welcome");
// });

router.get('/', (req, res) => res.render('login'));

// Add a route for the path /about
router.get("/home", (req, res) => res.render("home"));



module.exports = router;
