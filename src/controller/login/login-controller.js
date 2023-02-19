window.loginController = function ($scope, $location, $http, $window) {
  $scope.listAcc = [];
  $http.get(accApi).then(function (response) {
    $scope.listAcc = response.data;
    console.log($scope.listAcc);
  });
  $scope.login = function () {
    var data = {
      email: $scope.email,
      password: $scope.password,
    };
    console.log(data.email);
    if (data.email == null) {
      alert("Please enter email");
      return;
    }
    if (data.password == null) {
      alert("Please enter password");
      return;
    }
    let isLogin = false;
    for (let i = 0; i < $scope.listAcc.length; i++) {
      //   console.log($scope.listAcc[i].email.toUpperCase());
      //   console.log(data.email.toUpperCase());
      //   console.log(data.password);
      //   console.log($scope.listAcc[i].password);
      if (
        $scope.listAcc[i].email.toUpperCase() === data.email.toUpperCase() &&
        $scope.listAcc[i].password == data.password
      ) {
        alert("Login Success ");
        $window.localStorage.setItem("myKey", $scope.listAcc[i]);
        const home = document.getElementById("nav_home").classList;
        const shop = document.getElementById("nav_shop").classList;
        const about = document.getElementById("nav_about").classList;
        const blog = document.getElementById("nav_blog").classList;
        const contact = document.getElementById("nav_contact").classList;
        const cart = document.getElementById("cart").classList;
        const login = document.getElementById("login").classList;
        const logout = document.getElementById("logout").classList;
        login.add("login-disable");
        logout.remove("login-disable");
        home.remove("disabled");
        shop.remove("disabled");
        about.remove("disabled");
        blog.remove("disabled");
        contact.remove("disabled");
        cart.remove("disabled");
        isLogin = true;
        console.log($scope.listAcc[i].role);
        if ($scope.listAcc[i].role == 1) {
          $location.path("/home");
        } else {
          $location.path("/manager-product");
        }
      }
    }
    if (isLogin == false) {
      alert("Login fail");
    }
  };
};
