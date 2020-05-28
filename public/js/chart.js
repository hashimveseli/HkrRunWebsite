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
    chart.destroy();

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
    chart = new Chart(ctx, {
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
    chart.destroy();

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
    chart = new Chart(ctx, {
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
    chart.destroy();

    var labels = [];
    var data = [];

    labels.push('start');
    data.push(0);

    for(var j = 0; j < workouts.length; j++){
        labels.push(workouts[j].workoutId);
        console.log('workoutId: ' + workouts[j].workoutId);

        //Split the time string 
        var time = workouts[j].time.split(':');
        console.log(time[0]);

        //If time is saved with hour placeholder as well.
        if(time.length == 3){

            if(time[0] == 0){
                var minutes = time[1];
                var seconds = time[2];

                var totalTime = minutes + '.' + seconds;
                totalTime = parseFloat(totalTime);
                data.push(totalTime);
            }else{
                //Convert hours to integer
                var hours = parseInt(time[0]);
                let hoursToMinutes = 0;

                for(var i = 0; i < hours; i++){
                    hoursToMinutes += 60;
                }

                var minutes = time[1];
                var seconds = time[2];

                var totalMinutes = hoursToMinutes + parseInt(minutes);
                var totalTime = totalMinutes + '.' + seconds;

                totalTime = parseFloat(totalTime);
                data.push(totalTime);
            }
            
        }
        else{
            data.push(parseFloat(workouts[j].time.replace(':', '.')));
        }
        
    }

    console.log(labels);
    console.log(data);

    console.log('Creating time graph..');
    var ctx = document.getElementById('workoutChart').getContext('2d');
    chart = new Chart(ctx, {
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