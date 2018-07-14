

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAucqurL_5eIHeHtAZAtfGdBTZsH2NuLSA",
    authDomain: "traintracker-17667.firebaseapp.com",
    databaseURL: "https://traintracker-17667.firebaseio.com",
    projectId: "traintracker-17667",
    storageBucket: "traintracker-17667.appspot.com",
    messagingSenderId: "683085428859"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var newDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var newFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: newDestination,
      start: firstTrain,
      frequency: newFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      var newTrain = childSnapshot.val().name;
      var newDestination = childSnapshot.val().destination;
      var firstStart = childSnapshot.val().start;
      var newFrequency = childSnapshot.val().frequency;

      var firstStartConverted = moment(firstStart, "HH:mm").subtract(1, "years");
      var currentTime = moment();
      var diffTime = moment().diff(moment(firstStartConverted), "minutes");
      var nextArrival = (diffTime % newFrequency);
      var minutesAway = newFrequency -  nextArrival;
      var nextTrain = moment().add(minutesAway, "minutes");
      console.log(moment(nextTrain).format("hh:mm"));

      $("#train-table > tbody").append("<tr><td>" + newTrain + "</td><td>" + newDestination + "</td><td>" +
      newFrequency + " Minutes" + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + minutesAway + "</td></tr>");

  })
