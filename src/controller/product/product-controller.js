window.productController = function ($scope, $http, $rootScope, $window) {
  if ($window.localStorage.getItem("myKey")) {
    logIn();
  }

  $rootScope.listProduct = [];
  $scope.listProductFilter = [];
  $scope.listCategory = [];
  $scope.input = {
    id: "",
    productName: "",
    productDescription: "",
    price: 0,
    img: "",
    dtimg1: "",
    dtimg2: "",
    dtimg3: "",
    idcategory: "",
  };
  // Fillter
  $scope.selectedCategory = null;
  $scope.filterCategory = function (id) {
    console.log(id);
    $scope.listProductFilter = [];
    if (id == null) {
      $scope.listProductFilter = $scope.listProduct;
    } else {
      for (let i = 0; i < $scope.listProduct.length; i++) {
        if ($scope.listProduct[i].idcategory == id) {
          $scope.listProductFilter.push($scope.listProduct[i]);
        }
      }
    }
  };
  // GET
  $http.get(giayApi).then(function (response) {
    $scope.listProduct = response.data;
  });
  $http.get(giayApi).then(function (response) {
    $scope.listProductFilter = response.data;
    // console.log(localStorage.getItem("key"));
  });
  // Get category
  $http.get(categoryApi).then(function (response) {
    $scope.listCategory = response.data;
  });

  function getData() {
    var imgID = document.getElementById("imgID");
    var dtImgID1 = document.getElementById("dtimg1ID");
    var dtImgID2 = document.getElementById("dtimg2ID");
    var dtImgID3 = document.getElementById("dtimg3ID");

    var inputData = {
      // bug id

      // id: Number($scope.listProduct[0].id + 1),
      productName: $scope.input.productName,
      productDescription: $scope.input.productDescription,
      price: Number($scope.input.price),
      img: imgID.value.substring(12, 99),
      dtimg1: dtImgID1.value.substring(12, 99),
      dtimg2: dtImgID2.value.substring(12, 99),
      dtimg3: dtImgID3.value.substring(12, 99),
      idcategory: Number($scope.input.category),
    };

    let isValid = true;
    if ($scope.input.productName == "") {
      alert("Please enter a product name");
      isValid = false;
    }
    if ($scope.input.productDescription == "") {
      alert("Please enter a product description");
      isValid = false;
    }
    if ($scope.input.price == null) {
      alert("Please enter a price");
      isValid = false;
    }
    if (
      imgID == null ||
      dtImgID1 == null ||
      dtImgID2 == null ||
      dtImgID3 == null
    ) {
      alert("Please enter a img");
      isValid = false;
    }
    if ($scope.input.category == null) {
      alert("Please enter a category");
      isValid = false;
    }
    if (isValid == true) {
      return inputData;
    } else {
      return null;
    }
  }
  $scope.add = function () {
    if (getData() != null) {
      $http.post(giayApi, getData()).then(function () {
        alert("Added product");
      });
      console.log(getData());
    }
  };
  //Detail
  $scope.detail = function (event, index) {
    event.preventDefault();
    // let pd = $scope.listProduct[index];
    console.log(index);
    $http.get(giayApi + "/" + index).then(function (response) {
      let pd = response.data;
      $scope.input.productName = pd.productName;
      $scope.input.productDescription = pd.productDescription;
      $scope.input.price = pd.price;
      $scope.input.idcategory = pd.idCategory;
      $scope.input.id = pd.id;
    });
    // $scope.input.img = pd.img;
  };
  // Delete
  $scope.delete = function (event, index) {
    event.preventDefault();
    // let product = $scope.listProduct[index];
    let api = giayApi + "/" + index;
    $http.delete(api).then(function () {
      $scope.listProduct.splice(index, 1);
      alert("Removed product");
    });
  };

  // Update
  $scope.update = function () {
    let api = giayApi + "/" + $scope.input.id;
    console.log($scope.input.id);
    if (getData() != null) {
      $http.put(api, getData()).then(function () {
        alert("Updated product");
      });
    }
  };
  // Pagination
  $scope.itemsPerPage = 4; // S??? ph???n t??? hi???n th??? tr??n m???i trang
  $scope.currentPage = 0; // Trang hi???n t???i
  $scope.pageCount = function () {
    return Math.ceil($scope.listProductFilter.length / $scope.itemsPerPage);
  };
  $scope.getItemsForPage = function (page) {
    var start = page * $scope.itemsPerPage;
    return $scope.items.slice(start, start + $scope.itemsPerPage);
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
