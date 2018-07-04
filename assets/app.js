var config = {
    apiKey: "AIzaSyCB8xxm-3gOKEe_o0E8qwb2LqAIQl7BpmM",
  authDomain: "train-scheduler-aa32c.firebaseapp.com",
  databaseURL: "https://train-scheduler-aa32c.firebaseio.com",
  storageBucket: "train-scheduler-aa32c.appspot.com",
  messagingSenderId: "984902017933"
};
firebase.initializeApp(config);

var database = firebase.database();

var connectionsRef = database.ref("/trains");

$("#add-train-btn").on("click", function (){
  var name = $("#train-name-input").val().trim();
  var destination= $("#destination-input").val().trim();
  var firstTime = $("#first-time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

 
  

  firstTrainTime=moment(firstTrainTime, "hh:mm").subtract(1, "years");
  console.log(firstTrainTime);
  
  var diffTime=moment().diff(moment(firstTrainTime),"minutes");
  
  var timeApart=diffTime%frequency;
  
  var minutesAway=frequency-timeApart;
  var nextArrival=moment().add(minutesAway,"minutes") ;

  connectionsRef.push({
      name:name,
      destination:destination,
      firstTime:firstTime,
      frequency:frequency,
      nextArrival:nextArrival,
      minutesAway:minutesAway

  });

  return false;
});

connectionsRef.on("child_added", function(childSnapshot) {
  console.log(childSnapshot)
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTime;
  var trainFrequency = childSnapshot.val().frequency;
  var nextArrival=childSnapshot.val().nextArrival;
  var minutesAway=childSnapshot.val().minutesAway;
  
  

  $("tbody").append("<tr>" + 
      "<td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency +
      "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

});