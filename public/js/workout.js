/**
 * This file contains a function used to visualize all the data of a specific workout.
 * 
 */

 function displayWorkout(workout){
   console.log('workout test!' + workout);

   var workoutDiv = document.getElementById('displayWorkout');

   var innerHtml = '';

   innerHtml = '<table class=\"defaultTable\">'
   innerHtml += '<tr class=\"defaultColumn\"><td>Attribute</td><td>Value</td></tr>';
   innerHtml += '<tr class=\"defaultRow0\"><td>Workout ID</td><td> ' + workout.workoutId + '</td></tr>';
   innerHtml += '<tr class=\"defaultRow1\"><td>Distance in km</td><td>' + workout.distance + '</td></tr>';
   innerHtml += '<tr class=\"defaultRow0\"><td>Steps</td><td>' + workout.steps + '</td></tr>';
   innerHtml += '<tr class=\"defaultRow1\"><td>Time hh:mm:ss</td><td>' + workout.time + '</td></tr>';
   innerHtml += '<tr class=\"defaultRow0\"><td>Distance performance</td><td>' + workout.distPerformance + '</td></tr>';
   innerHtml += '<tr class=\"defaultRow1\"><td>Steps performance</td><td>' + workout.stepsPerformance + '</td></tr>';
   innerHtml += '</table>';

   console.log(innerHtml);

    workoutDiv.innerHTML = innerHtml;

 }

