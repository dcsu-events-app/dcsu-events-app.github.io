angular.module('firebaseConfig', ['firebase'])

.run(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCk3gM4cdqbqUZrfOqOrxwpEmd-piKD984",
    authDomain: "dcsu-shop-orders.firebaseapp.com",
    databaseURL: "https://dcsu-shop-orders.firebaseio.com",
    storageBucket: "dcsu-shop-orders.appspot.com",
  };
  firebase.initializeApp(config);

})

/*

.service("TodoExample", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);
    var todos = {
        items: items,
        addItem: function(title){
            items.$add({
                title: title,
                finished: false
            })
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    return todos;
}])

*/