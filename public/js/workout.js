/**
 * 
 * 
 */

 function displayWorkout(workout){
    console.log('workout test!' + workout);

    var workoutDiv = document.getElementById('displayWorkout');

    var innerHtml = '';

    innerHtml = '<label>Workout ID: ' + workout.workoutId + '</label><br>';
    innerHtml += '<label>Distance: ' + workout.distance + '</label><br>';
    innerHtml += '<label>Steps: ' + workout.steps + '</label><br>';
    innerHtml += '<label>Time: ' + workout.time + '</label><br>';
    innerHtml += '<label>Distance performance: ' + workout.distPerformance + '</label><br>';
    innerHtml += '<label>Steps performance: ' + workout.stepsPerformance + '</label><br>';


    workoutDiv.innerHTML = innerHtml;

 }

