const axios = require('axios');

/**
 * This file contains all the different rest api calls the application makes.
 */

//Call to the REST API in order to log in a user.
function login(data) {
    console.log('Trying to log in..');
    
    return axios.post('https://hkrrun-jswgvsei4q-lz.a.run.app/login', {
        password: data.password,
        username: data.username
    })
    .then((response) => {
        console.log('Response received..');

        return response;

    }, (error) => {
        console.log('Error!');
        console.log(error);

        return false;
    }
    );
}

//Call to the REST API in order to register a new user.
function register(data){
    console.log('Registering new user..');

    return axios.post('https://hkrrun-jswgvsei4q-lz.a.run.app/register', {
        ssn: data.ssn,
        username: data.username,
        password: data.password,
        email: data.email,
        privilege: 0
    }).then((response) => {
        console.log('Response received..');

        return response;

    }, (error) => {
        console.log('Error!');
        console.log(error);

        return false;
    }
    );
}

//Call to the REST API used to fetch all the workouts a user has performed.
function fetchWorkouts(session){
    console.log('fetching all workouts..');
    console.log('Adding token: ', session.token);

    return axios.get('https://hkrrun-jswgvsei4q-lz.a.run.app/workout', 
    { headers: {'Authorization': 'Bearer ' + session.token}})
    .then((response) => {
        console.log('Response received..');

        return response;

    }, (error) => {
        console.log('Error!');
        console.log(error);

        return false;
    }
    );
}

//Call to the REST API to fetch all the users of the application, this is an admin functionality.
function fetchUsers(session){
    console.log('fetching all users');
    console.log('Adding token: ', session.token);

    return axios.get('https://hkrrun-jswgvsei4q-lz.a.run.app/user',
    { headers: {'Authorization': 'Bearer ' + session.token}})
    .then((response) => {
        console.log('Response received..');

        return response;

    }, (error) => {
        console.log('Error!');
        console.log(error);

        return false;
    })
}

//Call to the REST API to to change the password, used by the users.
function changePassword(data, session){
    console.log('Changing password..');
    console.log('Adding token: ', session.token);
    
    return axios.post('https://hkrrun-jswgvsei4q-lz.a.run.app/password', {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
    }, 
    { headers: {'Authorization': 'Bearer ' + session.token}})
    .then((response) => {
        console.log('Response received..');

        return response;

    }, (error) => {
        console.log('Error!');
        console.log(error);

        return false;
    }
    );
}

//Call to the REST API to change the email, this used by the users.
function changeEmail(data, session){
    console.log('Changing email..');
    console.log('Adding token: ', session.token);
    
    return axios.post('https://hkrrun-jswgvsei4q-lz.a.run.app/email', {
        oldEmail: data.oldEmail,
        newEmail: data.newEmail
    }, 
    { headers: {'Authorization': 'Bearer ' + session.token}})
    .then((response) => {
        console.log('Response received..');

        return response;

    }, (error) => {
        console.log('Error!');
        console.log(error);

        return false;
    }
    );
}

 //Call to the REST API that allows the admin to change a users password, this is an admin functionality.
function adminChangePassword(data, session){
    console.log('Admin changing a user password..');

    return axios.post('https://hkrrun-jswgvsei4q-lz.a.run.app/admin/password', {
        userId: data.userId,
        newPassword: data.newPassword
    }, 
    { headers: {'Authorization': 'Bearer ' + session.token}})
    .then((response) => {
        console.log('Admin change password response received..');
        console.log(response.data);
        
        return response;

    }, (error) => {
        console.log('Error!');
        console.log(error);

        return false;
    }
    );
}

 //Call to the REST API that allows the admin to change a users email, this is an admin functionality.
function adminChangeEmail(data, session){
    console.log('Admin changing a user email..');

    return axios.post('https://hkrrun-jswgvsei4q-lz.a.run.app/admin/email', {
        userId: data.userId,
        newEmail: data.newEmail
    }, 
    { headers: {'Authorization': 'Bearer ' + session.token}})
    .then((response) => {
        console.log('Response received..');

        return response;

    }, (error) => {
        console.log('Error!');
        console.log(error);

        return false;
    }
    );
}

 //Call to the REST API that allows the admin to change a users privilege, this is an admin functionality.
function adminChangePrivilege(data, session){
    console.log('Admin changing a user privilege..');

    return axios.post('https://hkrrun-jswgvsei4q-lz.a.run.app/admin/privilege', {
        userId: data.userId,
        newPrivilege: data.privilege
    }, 
    { headers: {'Authorization': 'Bearer ' + session.token}})
    .then((response) => {
        console.log('Response received..');

        return response;

    }, (error) => {
        console.log('Error!');
        console.log(error);

        return false;
    }
    );
}

 //Call to the REST API that allows the admin to delete a user, this is an admin functionality.
function adminDeleteUser(request, session){
    console.log('Admin deleting a user..', request.userId);

    return axios.delete('https://hkrrun-jswgvsei4q-lz.a.run.app/user', {data: {
        userId: request.userId
    }, headers: {'Authorization': 'Bearer ' + session.token}})
    .then((response) => {
        console.log('Response received..');

        return response;

    }, (error) => {
        console.log('Error!');
        console.log(error);

        return false;
    }
    );
}

//Export functions so they can be used by all routes..
module.exports = {
    login: login,
    register: register,
    fetchWorkouts:  fetchWorkouts,
    fetchUsers: fetchUsers,
    changePassword: changePassword,
    changeEmail: changeEmail,
    adminChangeEmail: adminChangeEmail,
    adminChangePassword: adminChangePassword,
    adminChangePrivilege: adminChangePrivilege,
    adminDeleteUser: adminDeleteUser
}
