window.categoryController = function ($scope, $http, $window) {
  if ($window.localStorage.getItem("myKey")) {
    logIn();
  }

  $scope.listCategory = [];
  $scope.input = {
    id: "",
    categoryName: "",
  };

  function getCategory() {
    var inputData = {
      id: $scope.input.id,
      categoryName: $scope.input.categoryName,
    };
    let isValid = true;
    if (inputData.id == "") {
      alert("Please enter id");
      isValid = false;
    }
    if (inputData.categoryName == "") {
      alert("Please enter category name");
      isValid = false;
    }
    if (isValid == true) {
      return inputData;
    } else {
      return null;
    }
  }
  //   GET
  $http.get(categoryApi).then(function (response) {
    $scope.listCategory = response.data;
  });
  // ADD
  $scope.add = function () {
    if (getCategory() != null) {
      $http.post(categoryApi, getCategory()).then(function () {
        alert("Added category");
      });
    }
  };
  // Remove
  $scope.delete = function (event, index) {
    event.preventDefault();
    // let category = $scope.listCategory[index];
    $http.delete(categoryApi + "/" + index).then(function () {
      // $scope.listCategory.splice(index, 1);
      alert("Removed category");
    });
  };
  // Detail
  $scope.detail = function (event, index) {
    event.preventDefault();
    $http.get(categoryApi + "/" + index).then(function (response) {
      let category = response.data;
      $scope.input.id = category.id;
      $scope.input.categoryName = category.categoryName;
    });
  };
  // Update
  $scope.update = function (event, index) {
    // event.preventDefault();

    if (getCategory() != null) {
      let id = getCategory().id;
      let api = categoryApi + "/" + id;
      $http.put(api, getCategory()).then(function () {
        alert("Updated category");
      });
    }
  };
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
