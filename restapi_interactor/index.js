const axios = require('axios');

/**
 * Information
 */

function login(data) {
    console.log('Trying to log in..');
    
    return axios.post('https://hkrrun-jswgvsei4q-lz.a.run.app/login', {
        password: data.password,
        username: data.username
    })
    .then((response) => {
        console.log('Response received..');

        console.log('Adding token to axios variables..');
        axios.defaults.headers.common['authorization'] = 'Bearer ' + response.data.token;

        return response;

    }, (error) => {
        console.log('Error!');
        console.log(error);

        return false;
    }
    );
}

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

function fetchWorkouts(){
    console.log('fetching all workouts..');

    return axios.get('https://hkrrun-jswgvsei4q-lz.a.run.app/workout')
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

function fetchUsers(){
    console.log('fetching all users');

    return axios.get('https://hkrrun-jswgvsei4q-lz.a.run.app/user')
    .then((response) => {
        console.log('Response received..');

        return response;

    }, (error) => {
        console.log('Error!');
        console.log(error);

        return false;
    })
}

/**
 * Configuration REST API calls
 * 
 */

function changePassword(data){
    console.log('Changing password..');
    
    return axios.post('https://hkrrun-jswgvsei4q-lz.a.run.app/password', {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
    })
    .then((response) => {
        console.log('Response received..');

        console.log('Adding new token to axios variables..');
        axios.defaults.headers.common['authorization'] = 'Bearer ' + response.data.token;

        return response;

    }, (error) => {
        console.log('Error!');
        console.log(error);

        return false;
    }
    );
}

function changeEmail(data){
    console.log('Changing email..');
    
    return axios.post('https://hkrrun-jswgvsei4q-lz.a.run.app/email', {
        oldEmail: data.oldEmail,
        newEmail: data.newEmail
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

/**
 * Admin methods
 * 
 * 
 */

function adminChangePassword(data){
    console.log('Admin changing a user password..');

    return axios.post('https://hkrrun-jswgvsei4q-lz.a.run.app/admin/password', {
        userId: data.userId,
        newPassword: data.newPassword
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

function adminChangeEmail(data){
    console.log('Admin changing a user email..');

    return axios.post('https://hkrrun-jswgvsei4q-lz.a.run.app/admin/email', {
        userId: data.userId,
        newEmail: data.newEmail
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

function adminChangePrivilege(data){
    console.log('Admin changing a user privilege..');

    return axios.post('https://hkrrun-jswgvsei4q-lz.a.run.app/admin/privilege', {
        userId: data.userId,
        privilege: data.privilege
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

function adminDeleteUser(data){
    console.log('Admin deleting a user..');

    return axios.delete('https://hkrrun-jswgvsei4q-lz.a.run.app/user', {
        userId: data.userId
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

//Perhaps not needed!
/*function fetchWorkout(id){
    console.log('Fetching workout with id: ' + id);

    return axios.get('https://hkrrun-api-jswgvsei4q-lz.a.run.app/workout/' + id)
    .then((response) => {
        console.log('response received..')
        console.log(response.data);

        return response;
    }, (error) => {
        console.log('Error!');
        console.log(error);
    });
}*/

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
