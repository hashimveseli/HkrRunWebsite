/**
 * A sample Express server with static resources.
 */
"use strict";

const port    = process.env.PORT || 1338;
const path    = require("path");
const express = require("express");
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const app     = express();
const routeIndex = require("./route/index.js");
const consoleInformationMiddleware = require("./middleware/index.js");

app.set("view engine", "ejs");

app.use(expressSession({secret: process.env.SESSION_SECRET || 'testing'}));
app.use(consoleInformationMiddleware.logIncomingToConsole);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));

//Root routes
app.use("/", routeIndex);

//Console information
app.listen(port, logStartUpDetailsToConsole);

/**
 * Log app details to console when starting up.
 *
 * @return {void}
 */
function logStartUpDetailsToConsole() {
    let routes = [];

    // Find what routes are supported
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            // Routes registered directly on the app
            routes.push(middleware.route);
        } else if (middleware.name === "router") {
            // Routes added as router middleware
            middleware.handle.stack.forEach((handler) => {
                let route;

                route = handler.route;
                route && routes.push(route);
            });
        }
    });

    console.info(`Server is listening on port ${port}.`);
    console.info("Available routes are:");
    console.info(routes);
}
