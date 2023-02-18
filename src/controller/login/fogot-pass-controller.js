window.fogotController = function ($scope, $http) {
  $scope.lissAcc = [];
  $scope.input = {
    email: "",
  };
  //   GET
  $http.get(accApi).then(function (response) {
    $scope.lissAcc = response.data;
  });
  function getAccount() {
    if ($scope.input.email == "") {
      alert("Please enter");
      return null;
    }
    for (let i = 0; i < $scope.lissAcc.length; i++) {
      if (
        $scope.lissAcc[i].email.toUpperCase() ==
        $scope.input.email.toUpperCase()
      ) {
        let acc = $scope.lissAcc[i];
        return acc;
      }
    }
    return null;
  }

  $scope.updatePass = function () {
    var acc1 = getAccount();
    if (acc1 == null) {
      alert("This account is Invalid");
      return;
    }
    var acc = {
      id: acc1.id,
      fristName: acc1.fristName,
      lastName: acc1.lastName,
      email: acc1.email,
      address: acc1.address,
      city: acc1.city,
      phone: acc1.phone,
      password: $scope.password,
      repassword: $scope.Repassword,
      role: acc1.role,
    };
    console.log(acc);
    let isValid = true;
    if ($scope.password == undefined) {
      alert("Please enter password");
      isValid = false;
    }
    if ($scope.Repassword != $scope.password) {
      alert("Please enter the correct password");
      isValid = false;
    }
    if (isValid == true) {
      $http.put(accApi + "/" + acc.id, acc).then(function () {
        alert("Updated password");
      });
    }
  };
};
