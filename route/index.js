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

//Add logout functionality
router.get('/logout', auth.authUser, (req, res) => {
    console.log('Logging out..');
    //Clear authorization header!
    let session = req.session;
    session.token = null;
    session.privilege = null;
    res.render('login');
})

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
router.get("/configuration", auth.authUser, (req, res) => {
    let data = {};
    data.passwordChangeStatus = '';
    data.emailChangeStatus = '';
    res.render("configuration", data);

});

//Route for about page
router.get("/about", auth.authUser, (req, res) => res.render("about"));

//Route for the register page
router.get('/register', (req, res) => {
    let data = {};
    data.registerStatus = '';

    res.render('register', data);
});

//Route for admin page
router.get('/admin', auth.authUser, auth.authRole, (req, res) => {

    //Fetch all users
    restApi.fetchUsers().then(response => {
        if(response.status == '200'){
            console.log('Users fetched');
            console.log(response.data);

            let data = {};
            data.users = response.data.users;
            data.message = 'Success';
            data.passwordChangeStatus = '';
            data.emailChangeStatus = '';
            data.deleteUserStatus = '';
            data.privilegeChangeStatus = '';

            res.render('admin', data);
        }else{

            let data = {};
            data.users = null;
            data.message = 'Failure fetching all users';
            data.passwordChangeStatus = '';
            data.emailChangeStatus = '';
            data.deleteUserStatus = '';
            data.privilegeChangeStatus = '';

            res.render('admin', data);
        }
    });
});

//Login handling
router.post('/', (req, res) => {
    restApi.login(req.body).then(response => {
        if(response.status == '200'){
            let sess = req.session;
            sess.token = response.data.token;
            sess.privilege = response.data.privilege;

            console.log(sess.token);
            console.log(sess.privilege);

            res.render('home');
        }else{
            res.render('login');
        }
    });
    
});

//Register
router.post('/register', (req, res) => {
    restApi.register(req.body).then(response => {
        if(response.status == '200'){
            let data = {};
            data.registerStatus = '';

            res.render('login');
        }else{
            let data = {};
            data.registerStatus = 'Failed registering new user..'
            res.render('register', data);
        }
    })
})

//Change password
router.post('/password', (req, res) => {
    restApi.changePassword(req.body).then(response => {
        if(response.status == '200'){
            let data = {};
            data.passwordChangeStatus = 'Password changed!';
            data.emailChangeStatus = '';

            res.render('configuration', data);

        }else{
            let data = {};
            data.passwordChangeStatus = 'Password change failed..';
            data.emailChangeStatus = '';
            res.render('configuration', data);
        }
    });
})

//Change email
router.post('/email', (req, res) => {
    restApi.changeEmail(req.body).then(response => {
        if(response.status == '200'){
            let data = {};
            data.passwordChangeStatus = '';
            data.emailChangeStatus = 'Email change failed..';

            res.render('configuration', data);

        }else{
            let data = {};
            data.passwordChangeStatus = '';
            data.emailChangeStatus = 'Email change failed..';
            res.render('configuration', data);
        }
    });

});

//Admin endpoints

//Change user password
router.post('/admin/password', (req, res) => {
    restApi.adminChangePassword(req.body).then(response => {
        if(response.status == '200'){
            let data = {};
            data.passwordChangeStatus = 'Password changed!';
            data.emailChangeStatus = '';
            data.deleteUserStatus = '';
            data.privilegeChangeStatus = '';

            res.render('configuration', data);

        }else{
            let data = {};
            data.passwordChangeStatus = 'Password change failed..';
            data.emailChangeStatus = '';
            data.deleteUserStatus = '';
            data.privilegeChangeStatus = '';
            res.render('configuration', data);
        }
    });
})

//Change admin email
router.post('/admin/email', (req, res) => {
    restApi.adminChangeEmail(req.body).then(response => {
        if(response.status == '200'){
            let data = {};
            data.passwordChangeStatus = '';
            data.emailChangeStatus = 'Email changed..';
            data.deleteUserStatus = '';
            data.privilegeChangeStatus = '';

            res.render('configuration', data);

        }else{
            let data = {};
            data.passwordChangeStatus = '';
            data.emailChangeStatus = 'Email change failed..';
            data.deleteUserStatus = '';
            data.privilegeChangeStatus = '';
            res.render('configuration', data);
        }
    });

});

//Delete user
router.post('/admin/delete', (req, res) => {
    restApi.adminDeleteUser(req.body).then(response => {
        if(response.status == '200'){
            let data = {};
            data.passwordChangeStatus = '';
            data.emailChangeStatus = '';
            data.deleteUserStatus = 'Delete user successful..';
            data.privilegeChangeStatus = '';

            res.render('configuration', data);

        }else{
            let data = {};
            data.passwordChangeStatus = '';
            data.emailChangeStatus = '';
            data.deleteUserStatus = 'Delete user failed';
            data.privilegeChangeStatus = '';
            res.render('configuration', data);
        }
    });

});

//Change privilege
router.post('/admin/privilege', (req, res) => {
    restApi.adminChangePrivilege(req.body).then(response => {
        if(response.status == '200'){
            let data = {};
            data.passwordChangeStatus = '';
            data.emailChangeStatus = '';
            data.deleteUserStatus = '';
            data.privilegeChangeStatus = 'Privilege changed..';

            res.render('configuration', data);

        }else{
            let data = {};
            data.passwordChangeStatus = '';
            data.emailChangeStatus = '';
            data.deleteUserStatus = '';
            data.privilegeChangeStatus = 'Privilege change failed..';
            res.render('configuration', data);
        }
    });

});

module.exports = router;
