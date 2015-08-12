myApp.controller('CheckInsController', ["$scope", "$rootScope", "$firebaseArray", "$firebaseObject", "$routeParams", "$location", "Authentication", "FIREBASE_URL", function($scope,
  $rootScope, $firebaseArray, $firebaseObject, $routeParams,
  $location, Authentication, FIREBASE_URL) {

  $scope.whichmeeting = $routeParams.mId;
  $scope.whichuser = $routeParams.uId;
  $scope.order="firstname";
  $scope.direction= null;
  $scope.recordId='';
  $scope.query='';

  var ref = new Firebase(FIREBASE_URL + "/users/" +
    $scope.whichuser + "/meetings/" +
    $scope.whichmeeting + '/checkins');

  var checkinsList = $firebaseArray(ref);
  $scope.checkins = checkinsList;

  $scope.addCheckin = function() {
    var checkinsObj = $firebaseArray(ref);

    var myData = {
      firstname: $scope.user.firstname,
      lastname: $scope.user.lastname,
      email: $scope.user.email,
      date: Firebase.ServerValue.TIMESTAMP
    };

    checkinsObj.$add(myData).then(function() {
      $location.path('/checkins/' + $scope.whichuser + '/' +
        $scope.whichmeeting + '/checkinsList');
    });//checkinsObj
  }; //addCheckin


  $scope.pickRandom = function() {
    var whichRecord = Math.round(Math.random() * checkinsList.length);
    $scope.recordId = checkinsList.$keyAt(whichRecord);
  }; //pick winner

  $scope.deleteCheckin = function(id) {
    var record = $firebaseObject(ref);
    record.$remove(id);
  }; //deleteCheckin


 

  

}]); //CheckInsController
