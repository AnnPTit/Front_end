window.payController = function (
  $scope,
  $http,
  $routeParams,
  $route,
  $location,
  $window
) {
  if ($window.localStorage.getItem("myKey")) {
    logIn();
  }
  // Get sanpham
  $scope.product = {
    size: 0,
    quantity: 0,
  };
  $scope.product = {};
  if ($routeParams.id != null) {
    let api = giayApi + "/" + $routeParams.id;
    $http.get(api).then(function (response) {
      $scope.product = response.data;
      // console.log($scope.product);
    });
  }

  $scope.quantity = $routeParams.quantity; //
  $scope.size = $routeParams.size;

  $scope.pay = function () {
    let api = giayApi + "/" + $routeParams.id;
    $http.get(api).then(function (response) {
      $scope.product = response.data;
      console.log($scope.product);
    });
    var item = {
      productName: $scope.product.productName,
      productDescription: $scope.product.productDescription,
      price: $scope.product.price,
      img: $scope.product.img,
      dtimg1: $scope.product.dtimg1,
      dtimg2: $scope.product.dtimg2,
      dtimg3: $scope.product.dtimg3,
      idcategory: $scope.product.idcategory,
      quantity: $routeParams.quantity, //
      size: $routeParams.size,
    };
    $http.post(purchasedProductApi, item).then(function (response) {
      alert("Success!");
      $location.path(
        "/pay-history/" +
          $routeParams.id +
          "/" +
          $routeParams.quantity +
          "/" +
          $routeParams.size
      );
    });
  };
  // Get sp da mua
  $scope.listPurchases = [];
  $http.get(purchasedProductApi).then(function (response) {
    $scope.listPurchases = response.data;
    // $scope.tt = 0;
    function total() {
      var totalPrice = 0;
      for (let i = 0; i < $scope.listPurchases.length; i++) {
        totalPrice = totalPrice + $scope.listPurchases[i].price;
      }
      // console.log($scope.listPurchases);
      console.log(totalPrice);
      return totalPrice;
    }
    $scope.tt = total();
  });
  function logIn() {
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
  }
};
