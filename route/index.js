/**
 * General routes.
 */
"use strict";

const auth = require('../auth/authentication.js');
const workoutScripts = require('../public/js/workout.js');
const restApi = require('../restapi_interactor/index.js');
const express = require("express");
const {check, validationResult} = require('express-validator');
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
    restApi.fetchWorkouts(req.session).then((response) => {
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
    restApi.fetchUsers(req.session).then(response => {
        if(response.status == '200'){
            console.log('Users fetched');
            console.log(response.data);

            let data = {};
            if(req.session.adminMessages != undefined){
                data = req.session.adminMessages;
                data.users = response.data.users;
            }else{
                data.users = response.data.users;
                data.message = 'Success';
                data.passwordChangeStatus = '';
                data.emailChangeStatus = '';
                data.deleteUserStatus = '';
                data.privilegeChangeStatus = '';
            }

            res.render('admin', data);
        }else{

            let data = {};
            if(req.session.adminMessages != undefined){
                data = req.session.adminMessages;
                data.users = response.data.users;
            }else{
                data.users = response.data.users;
                data.message = 'Failure fetching users';
                data.passwordChangeStatus = '';
                data.emailChangeStatus = '';
                data.deleteUserStatus = '';
                data.privilegeChangeStatus = '';
            }

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
router.post('/register', [check('email').isEmail()], [check('ssn').isNumeric()], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors);
        let data = {};
        data.registerStatus = 'Failed registering, invalid input.';

        res.render('register', data);

    }else{

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
        });
    }
});

//Change password
router.post('/password', (req, res) => {
    restApi.changePassword(req.body, req.session).then(response => {
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
router.post('/email', [check('email').isEmail()], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        let data = {};
        data.passwordChangeStatus = '';
        data.emailChangeStatus = 'Email change failed..';

        res.render('configuration', data);

    }else{
        restApi.changeEmail(req.body, req.session).then(response => {
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
    }

});

//Admin endpoints

//Change user password
router.post('/admin/password', (req, res) => {
    const data = {};

    restApi.adminChangePassword(req.body, req.session).then(response => {
        if(response.status == '200'){
            console.log('Admin password change success..');
            data.passwordChangeStatus = 'Password changed!';
            data.emailChangeStatus = '';
            data.deleteUserStatus = '';
            data.privilegeChangeStatus = '';

            req.session.adminMessages = data;

            res.redirect('/admin');

        }else{
            console.log('Admin password change failed..');
            data.passwordChangeStatus = 'Password change failed..';
            data.emailChangeStatus = '';
            data.deleteUserStatus = '';
            data.privilegeChangeStatus = '';

            req.session.adminMessages = data;

            res.redirect('/admin');
        }
    });
})

//Change admin email
router.post('/admin/email',[check('email').isEmail()], (req, res) => {
    const data = {};

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        data.passwordChangeStatus = '';
        data.emailChangeStatus = 'Email change failed..';
        data.deleteUserStatus = '';
        data.privilegeChangeStatus = '';

        req.session.adminMessages = data;

        res.redirect('/admin');

    }else{

        restApi.adminChangeEmail(req.body, req.session).then(response => {
            if(response.status == '200'){
                console.log('Admin email change success..');
                data.passwordChangeStatus = '';
                data.emailChangeStatus = 'Email changed..';
                data.deleteUserStatus = '';
                data.privilegeChangeStatus = '';

                req.session.adminMessages = data;

                res.redirect('/admin');

            }else{
                console.log('Admin email change failed..');
                data.passwordChangeStatus = '';
                data.emailChangeStatus = 'Email change failed..';
                data.deleteUserStatus = '';
                data.privilegeChangeStatus = '';

                req.session.adminMessages = data;

                res.redirect('/admin');
            }
        
        });
    }

});

//Delete user
router.post('/admin/delete',[check('userId').isNumeric()], (req, res) => {
    const data = {};

    console.log(req.body);
    console.log('Attempting to delete user');

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        data.passwordChangeStatus = '';
        data.emailChangeStatus = '';
        data.deleteUserStatus = 'Delete user failed';
        data.privilegeChangeStatus = '';

        req.session.adminMessages = data;

        res.redirect('/admin');

    }else{

        restApi.adminDeleteUser(req.body, req.session).then(response => {
            if(response.status == '200'){
                console.log('Admin delete user success..');
                data.passwordChangeStatus = '';
                data.emailChangeStatus = '';
                data.deleteUserStatus = 'Delete user successful..';
                data.privilegeChangeStatus = '';

                req.session.adminMessages = data;

                res.redirect('/admin');

            }else{
                console.log('Admin delete user failed..');
                data.passwordChangeStatus = '';
                data.emailChangeStatus = '';
                data.deleteUserStatus = 'Delete user failed';
                data.privilegeChangeStatus = '';

                req.session.adminMessages = data;

                res.redirect('/admin');
            }
        
        });
    }

});

//Change privilege
router.post('/admin/privilege', [check('privilege').isNumeric()], (req, res) => {
    const data = {};

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        data.passwordChangeStatus = '';
        data.emailChangeStatus = '';
        data.deleteUserStatus = '';
        data.privilegeChangeStatus = 'Privilege change failed..';

        req.session.adminMessages = data;

        res.redirect('/admin');

    }

    if(req.body.privilege == 1 || req.body.privilege == 0){

        restApi.adminChangePrivilege(req.body, req.session).then(response => {
            if(response.status == '200'){
                console.log('Admin privilege change success..');
                data.passwordChangeStatus = '';
                data.emailChangeStatus = '';
                data.deleteUserStatus = '';
                data.privilegeChangeStatus = 'Privilege changed..';

                req.session.adminMessages = data;

                res.redirect('/admin');

            }else{
                console.log('Admin privilege change failed..');
                data.passwordChangeStatus = '';
                data.emailChangeStatus = '';
                data.deleteUserStatus = '';
                data.privilegeChangeStatus = 'Privilege change failed..';

                req.session.adminMessages = data;

                res.redirect('/admin');
            }
            

        });
    }else{
        console.log('Privilege not 0 or 1..');
        data.passwordChangeStatus = '';
        data.emailChangeStatus = '';
        data.deleteUserStatus = '';
        data.privilegeChangeStatus = 'Privilege change failed..';

        req.session.adminMessages = data;

        res.redirect('/admin');
    }

});

module.exports = router;
