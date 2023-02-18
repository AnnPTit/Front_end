window.registerController = function ($scope, $http, $location) {
  $scope.listAcc = [];
  $scope.inputUser = {
    // id: 2,
    fristName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    password: "",
    repassword: "",
    role: 1,
  };
  //   GET
  $http.get(accApi).then(function (response) {
    $scope.listAcc = response.data;
  });

  $scope.Register = function () {
    let isValid = true;
    if ($scope.inputUser.fristName == "") {
      isValid = false;
    }
    if ($scope.inputUser.lastName == "") {
      isValid = false;
    }
    if ($scope.inputUser.email == "") {
      isValid = false;
    }
    if ($scope.inputUser.address == "") {
      isValid = false;
    }
    if ($scope.inputUser.password == "") {
      isValid = false;
    }
    if ($scope.inputUser.repassword == "") {
      isValid = false;
    }
    if ($scope.inputUser.password != $scope.inputUser.repassword) {
      alert("Password incorrect");
      isValid = false;
    }

    for (let i = 0; i < $scope.listAcc.length; i++) {
      if (
        $scope.listAcc[i].email.toUpperCase() ==
        $scope.inputUser.email.toUpperCase()
      ) {
        alert("Email already");
        isValid = false;
      }
    }
    if (isValid == true) {
      console.log($scope.inputUser);
      $http.post(accApi, $scope.inputUser).then(function () {
        alert("Sign up successfully");
        $location.path("/login");
      });
    }
  };
};
