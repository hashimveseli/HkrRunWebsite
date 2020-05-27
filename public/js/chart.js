/**
 * This file contains the functionality needed to visualize the data in graphs.
 * Using the chart.js package.
 * 
 */
console.log('Creating empty chart..');
var ctx = document.getElementById('workoutChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: []
    },

    // Configuration options go here
    options: {}
});



function displayDistanceGraph(workouts){
    console.log('Creating distance graph data..');

    var labels = [];
    var data = [];

    labels.push('start');
    data.push(0);

    for(var i = 0; i < workouts.length; i++){
        labels.push(workouts[i].workoutId);
        data.push(workouts[i].distance);
    }

    console.log(labels);
    console.log(data);

    console.log('Creating distance graph..');
    var ctx = document.getElementById('workoutChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: labels,
        datasets: [{
            label: 'Distance',
            backgroundColor: 'rgb(132, 190, 108)',
            borderColor: 'rgb(132, 190, 108)',
            data: data
        }]
    },

    // Configuration options go here
    options: {}
});

}

function displayStepsGraph(workouts){
    console.log('Creating steps graph data..');

    var labels = [];
    var data = [];

    labels.push('start');
    data.push(0);

    for(var i = 0; i < workouts.length; i++){
        labels.push(workouts[i].workoutId);
        data.push(workouts[i].steps);
    }

    console.log(labels);
    console.log(data);

    console.log('Creating steps graph..');
    var ctx = document.getElementById('workoutChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: labels,
        datasets: [{
            label: 'Steps',
            backgroundColor: 'rgb(132, 190, 108)',
            borderColor: 'rgb(132, 190, 108)',
            data: data
        }]
    },

    // Configuration options go here
    options: {}
    });
}

function displayTimeGraph(workouts){
    console.log('Creating time graph data..');

    var labels = [];
    var data = [];

    labels.push('start');
    data.push(0);

    for(var i = 0; i < workouts.length; i++){
        labels.push(workouts[i].workoutId);
        
        data.push(parseFloat(workouts[i].time.replace(':', '.')));
    }

    console.log(labels);
    console.log(data);

    console.log('Creating time graph..');
    var ctx = document.getElementById('workoutChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: labels,
        datasets: [{
            label: 'Time',
            backgroundColor: 'rgb(132, 190, 108)',
            borderColor: 'rgb(132, 190, 108)',
            data: data
        }]
    },

    // Configuration options go here
    options: {}
    });
}