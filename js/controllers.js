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
    
    $scope.oldOrNew = function(obj){
        
        if ( obj.TimeStamp > Date.now() ) {
            return true;
        } else {
            return false;
        }
    }
}])
   
.controller('calendarCtrl', ['$scope', '$stateParams', '$filter', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $filter, $window) {
    $scope.events = [];
    $scope.foundMonths = [];
    prevMonth = '';
    var dbRef = firebase.database().ref('events');
    dbRef.once('value',function(snapshot){
        angular.forEach(snapshot.val(), function(value, key) {
            if ( $filter('date')(value.TimeStamp, 'MMMM') !== prevMonth ) {
                $scope.foundMonths.push( {month: $filter('date')(value.TimeStamp, 'MMMM'), year: $filter('date')(value.TimeStamp, 'yy')}  );
                prevMonth =  $filter('date')(value.TimeStamp, 'MMMM');
            }
            this.push(value);

        }, $scope.events);
        
        $scope.$apply();
    });
    console.log($scope.foundMonths);
    $scope.goTo = function(link){
        $window.parent.location.href = link;
        console.log('Going to:'+link);
    };
    
    $scope.months = ["January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"];
    
    dates = [];
    date = new Date();
    startMonth = date.getMonth();
    for(i=startMonth;i<12;i++){
       dates.push({month: $scope.months[i], year: '17' });
    }
    for(i=0;i<startMonth;i++){
       dates.push({month: $scope.months[i], year: '18' });
    }
    $scope.dates = [];
    $scope.dates = dates;
    //console.log(dates);
    //$scope.monthNOW3 = $filter('date')(1288323623006, 'shortDate');
    //console.log ($scope.monthNOW3);
    
    $scope.filterByMonth = function(date){
        //console.log(date);
        
        return function(item){ 
            //console.log($filter('date')(item.TimeStamp, 'MMMM'));
          if($filter('date')(item.TimeStamp, 'MMMM') === date.month){
              
            console.log(date.year === $filter('date')(item.TimeStamp, 'yy'));
            //
            if(item.TimeStamp > date){ console.log('Foundone OUt of Date'); }
              if($filter('date')(item.TimeStamp, 'yy') === date.year) {
                  return true
              } else {
                  return false;
              }
          }
        };
    }
    $scope.goTo = function(link){
        $window.parent.location.href = link;
        console.log('Going to:'+link);
    }
}])
 