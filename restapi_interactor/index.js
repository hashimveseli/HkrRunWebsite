const axios = require('axios');

/**
 * Information
 */

function login(data) {
    console.log('Trying to log in..');
    
    return axios.post('https://hkrrun-api-jswgvsei4q-lz.a.run.app/login', {
        password: data.password,
        username: data.username
    })
    .then((response) => {
        console.log('Response received..');

        console.log('Adding token to axios variables..');
        axios.defaults.headers.common['authorization'] = 'Bearer ' + response.data.token;

        return response.status;

    }, (error) => {
        console.log('Error!');
        console.log(error);

        return false;
    }
    );
}

function fetchWorkout(id){
    console.log('Fetching workout with id: ' + id);

    return axios.get('https://hkrrun-api-jswgvsei4q-lz.a.run.app/workout/' + id)
    .then((response) => {
        console.log('response received..')
        console.log(response.data);

        return response.data;
    }, (error) => {
        console.log('Error!');
        console.log(error);
    });
}

//Export functions so they can be used by all routes..
module.exports = {
    login: login,
    fetchWorkout: fetchWorkout
}
