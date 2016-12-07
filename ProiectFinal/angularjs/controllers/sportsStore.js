angular.module("sportsStore")
    .constant("dataUrl", "http://localhost:2403/products")
    .constant("orderUrl", "http://localhost:2403/orders")
.controller("sportsStoreCtrl", function ($scope, $http, $location, dataUrl, orderUrl, cart) {
  $scope.data = {};

  $http.get(dataUrl)
  .success(function (data) {
    $scope.data.products = data;
  })
  .error(function (error) {
    $scope.data.error = error;
      $scope.data.products = [
          { name: "Kayak", description: "A boat for one person",
              category: "Watersports", price: 275 },
          { name: "Lifejacket", description: "Protective and fashionable",
              category: "Watersports", price: 110 },
          { name: "Soccer Ball", description: "FIFA-approved size and weight",
              category: "Soccer", price: 210 },
          { name: "Corner Flags", description: "Give your playing field a professional touch",
              category: "Soccer", price: 202 },
          { name: "Thinking Cap", description: "Improve your brain efficienty by 75%",
              category: "Chess", price: 16 },
          { name: "Unsteady Chair", description: "Secretly give your opponent a disadvantage",
              category: "Chess", price: 29.95 }]
  });

  $scope.sendOrder = function(shippingDetails){
    var order = angular.copy(shippingDetails);
    order.products = cart.getProducts();
    $http.post(orderUrl, order)
        .success(function(data){
          $scope.data.orderId = data.id;
          cart.getProducts().length = 0;
        })
        .error(function(error){
          $scope.data.orderError = error;
        }).finally(function(){
            $location.path("/complete");
    });
  }

});