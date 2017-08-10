angular.module('app.controllers', [])
  
.controller('pageCtrl', ['$scope', '$stateParams', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $window) {
    $scope.events = [];
    var dbRef = firebase.database().ref('events');
    dbRef.once('value',function(snapshot){
        angular.forEach(snapshot.val(), function(value, key) {
            this.push(value);
        }, $scope.events);
        console.log(snapshot.val());
        console.log($scope.events);
        $scope.$apply();
    });
    
    $scope.goTo = function(link){
        $window.parent.location.href = link;
        console.log('Going to:'+link);
    }
}])
 