window.showDetails = function (
  $scope,
  $routeParams,
  $http,
  $location,
  $window,
  $interpolate
) {
  // GET
  if ($window.localStorage.getItem("myKey")) {
    logIn();
  }
  $scope.DETAIL = [];
  $http.get(giayApi).then(function (response) {
    $scope.DETAIL = response.data;
  });
  if ($routeParams.id != null) {
    let api = giayApi + "/" + Number($routeParams.id);
    $http.get(api).then(function (response) {
      $scope.product = response.data;
    });
  }

  //********************************* cart ***********************************************
  $scope.listProductsInCart = [];

  $scope.product = {
    productName: "",
    productDescription: "",
    price: 0,
  };
  // GET
  $http.get(productInCartApi).then(function (response) {
    $scope.listProductsInCart = response.data;

    $scope.totalPrice = total();
    if (typeof Storage !== "undefined") {
      // Store
      localStorage.setItem("icon", $scope.listProductsInCart.length);
      // Retrieve
      document.getElementById("result").innerHTML =
        localStorage.getItem("icon");
    } else {
      document.getElementById("result").innerHTML =
        "Sorry, your browser does not support Web Storage...";
    }
  });

  //  total price*******************************************
  function total() {
    var totalPrice = 0;
    for (let i = 0; i < $scope.listProductsInCart.length; i++) {
      totalPrice =
        totalPrice +
        $scope.listProductsInCart[i].price *
          $scope.listProductsInCart[i].quantity;
    }
    return totalPrice;
  }

  function getProduct() {
    var product_cart = {
      productName: $scope.product.productName,
      productDescription: $scope.product.productDescription,
      price: $scope.product.price,
      size: $scope.product.size,
      quantity: $scope.product.quantity,
      img: $scope.product.img,
    };
    if (
      $scope.product.size == undefined ||
      $scope.product.quantity == undefined
    ) {
      alert("Please select a size and quantity");
      return null;
    }
    return product_cart;
  }
  // ADD to cart
  $scope.addToCart = function () {
    if (getProduct() != null) {
      console.log(getProduct());
      $http.post(productInCartApi, getProduct()).then(function () {
        alert("Product added successfully");
        // Fill len icon
        if (typeof Storage !== "undefined") {
          // Store
          localStorage.setItem("icon", $scope.listProductsInCart.length);
          // Retrieve
          document.getElementById("result").innerHTML =
            localStorage.getItem("icon");
        } else {
          document.getElementById("result").innerHTML =
            "Sorry, your browser does not support Web Storage...";
        }
      });
    }
  };
  // Delete from cart
  $scope.delete = function (event, index) {
    event.preventDefault();
    let pd = $scope.listProductsInCart[index];
    let api = productInCartApi + "/" + pd.id;
    $http.delete(api).then(function () {
      $scope.listProductsInCart.splice(index, 1);
    });
  };
  // *********************pay****************************
  // Buy Now
  $scope.listPay = {};
  // Get
  // $http.get(purchasedProductApi).then(function (response) {
  //   $scope.listPay = response.data;
  // });
  $scope.buyNow = function () {
    if (getProduct() != null) {
      // $scope.listPay.push(getProduct());
      if ($routeParams.id != null) {
        let api = giayApi + "/" + Number($routeParams.id);
        console.log($routeParams.id);
        $http.get(api).then(function (response) {
          $scope.listPay = response.data;
        });
      }
      $scope.quantity = getProduct().quantity;
      $scope.size = getProduct().size;
      $location.path(
        "/pay/" +
          $routeParams.id +
          "/" +
          getProduct().quantity +
          "/" +
          getProduct().size
      );
    }
  };
  $scope.show = function () {};

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
