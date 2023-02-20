var app = angular.module("myModule", ["ngRoute"]);

app.filter("myFormat", function () {
  return function (x) {
    var i,
      c,
      txt = "";
    for (i = 0; i < x.length; i++) {
      c = x[i];
      if (i % 2 == 0) {
        c = c.toUpperCase();
      }
      txt += c;
    }
    return txt;
  };
});

function show() {
  // var input = document.getElementById("inputField");
  // var value = input.value;
  // alert("Input value: " + value);
  // // return value;
  // if (typeof Storage !== "undefined") {
  //   // Store
  //   localStorage.setItem("key", value);
  //   // Retrieve
  //   // document.getElementById("result").innerHTML = localStorage.getItem("key");
  // } else {
  //   // document.getElementById("result").innerHTML =
  //   ("Sorry, your browser does not support Web Storage...");
  // }
}

function logout() {
  const home = document.getElementById("nav_home").classList;
  const shop = document.getElementById("nav_shop").classList;
  const about = document.getElementById("nav_about").classList;
  const blog = document.getElementById("nav_blog").classList;
  const contact = document.getElementById("nav_contact").classList;
  const cart = document.getElementById("cart").classList;
  const login = document.getElementById("login").classList;
  const logout = document.getElementById("logout").classList;
  login.remove("login-disable");
  logout.add("login-disable");
  home.add("disabled");
  shop.add("disabled");
  about.add("disabled");
  blog.add("disabled");
  contact.add("disabled");
  cart.add("disabled");
}

// *****************
app.service("globalVarService", function () {
  var globalVar = "";

  return {
    getGlobalVar: function () {
      return globalVar;
    },
    setGlobalVar: function (value) {
      globalVar = value;
    },
  };
});

// ******************

app.config(function ($routeProvider, $locationProvider) {
  // xoa tren duong dan
  $locationProvider.hashPrefix("");
  $locationProvider.html5Mode = true;
  // chuyen trang
  $routeProvider
    .when("/home", {
      //code  here
      templateUrl: "../src/pages/home.html",
      controller: productController,
    })
    .when("/shop", {
      //code  here
      templateUrl: "../src/pages/shop.html",
      controller: productController,
    })
    .when("/page", {
      //code  here
      templateUrl: "../src/pages/page.html",
    })
    .when("/blog", {
      //code  here
      templateUrl: "../src/pages/blog.html",
    })
    .when("/contact", {
      //code  here
      templateUrl: "../src/pages/contact.html",
    })
    .when("/login", {
      //code  here
      templateUrl: "../src/pages/login.html",
      controller: loginController,
    })
    .when("/register", {
      //code  here
      templateUrl: "../src/pages/register.html",
      controller: registerController,
    })
    .when("/login-forget", {
      //code  here
      templateUrl: "../src/pages/forgot-page.html",
      controller: fogotController,
    })
    .when("/change-pass", {
      //code  here
      templateUrl: "../src/pages/change-pass.html",
      controller: fogotController,
    })
    .when("/about-us", {
      //code  here
      templateUrl: "../src/pages/about-us.html",
    })
    .when("/cart", {
      //code  here
      templateUrl: "../src/pages/cart.html",
      controller: showDetails,
    })
    .when("/detail-product/:id", {
      //code  here
      templateUrl: "../src/pages/detail-product.html",
      controller: showDetails,
    })
    .when("/pay/:id/:quantity/:size", {
      //code  here
      params: { path: true, logoValue: null },
      templateUrl: "../src/pages/pay.html",
      controller: payController,
    })

    .when("/pay-history/:id/:quantity/:size", {
      //code  here
      templateUrl: "../src/pages/pay-history.html",
      controller: payController,
    })
    .when("/manager-product", {
      //code  here
      templateUrl: "../src/pages/page-role-admin/product-manager.html",
      controller: productController,
    })
    .when("/manager-category", {
      //code  here
      templateUrl: "../src/pages/page-role-admin/category-manager.html",
      controller: categoryController,
    })
    .otherwise({
      redirectTo: "/login",
    });
});
