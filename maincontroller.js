var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope, $http) 
{
    var purchasePrice, sellPrice;
    $scope.func = function() 
    {
        submit1();
        submit2();
        result();
    }

    var submit1 = function()
    {
        var dateFormat1 =  $("#datepicker1").datepicker({ dateFormat: "dd-mm-yy" }).val();
        var dateFormat2 = dateFormat1.split("-").reverse().join("-");
        var unixtimestamp = (new Date(dateFormat2.replace('-','/'))).getTime() / 1000;
        if ($scope.currencyName == "bitcoin")
        {
            $http.get("https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=" + unixtimestamp +"&extraParams=your_app_name")
                .then(function successCallback(response)
                {
                    purchasePrice = response.data.BTC.USD;
                }, function errorCallback(response)
                    {
                        console.log("Unable to perform get request");
                    });


        }
        else if($scope.currencyName == "ethereum")
        {
            $http.get("https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=" + unixtimestamp +"&extraParams=your_app_name")
                .then(function successCallback(response)
                {
                    purchasePrice = response.data.ETH.USD;
                }, function errorCallback(response)
                    {
                        console.log("Unable to perform get request");
                    });
        }
    }

    var submit2 = function()
    {
        var dateFormat1 =  $("#datepicker2").datepicker({ dateFormat: "dd-mm-yy" }).val();
        var dateFormat2 = dateFormat1.split("-").reverse().join("-");
        var unixtimestamp = (new Date(dateFormat2.replace('-','/'))).getTime() / 1000;
        if ($scope.currencyName == "bitcoin")
        {
            $http.get("https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=" + unixtimestamp +"&extraParams=your_app_name")
                .then(function successCallback(response)
                {
                    sellPrice = response.data.BTC.USD;
                }, function errorCallback(response)
                    {
                        console.log("Unable to perform get request");
                    });
        }
        else if($scope.currencyName == "ethereum")
        {
            $http.get("https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=" + unixtimestamp +"&extraParams=your_app_name")
                .then(function successCallback(response)
                {
                    sellPrice = response.data.ETH.USD;
                }, function errorCallback(response)
                    {
                        console.log("Unable to perform get request");
                    });
        }
    }

    var result = function(){
        var amount = $scope.amount;
        var currency = $scope.currencyName;
        var A = parseFloat(purchasePrice*amount).toFixed(2);
        var B = parseFloat(sellPrice*amount).toFixed(2);
        var moneyUSD = parseFloat(A - B).toFixed(2);
        var tax = parseFloat(moneyUSD*0.3).toFixed(2);
        switch(currency)
        {
          case "bitcoin":
            if(moneyUSD > 0)
            {
              var str = "You bought " + amount + " BTC @ $" + purchasePrice + " worth $" + A + "\n" + "You sold " + $scope.amount + " BTC @ $" + sellPrice + " worth $" + B;
              $scope.result = "-$" + moneyUSD + "\n" + str;
            }
            else if(moneyUSD <= 0)
            {
              var str = "You bought " + amount + " BTC @ $" + purchasePrice + " worth $" + A + "\n" + " You sold " + $scope.amount + " BTC @ $" + sellPrice + " worth $" + B;
              $scope.result = "+$" + (-moneyUSD) + "\n" + str + "\n" + "Tax on profit is $"  + tax;  
            }
            break;
          case "ethereum":
            if(moneyUSD > 0)
            {
              var str = "You bought " + amount + " ETH @ $" + purchasePrice + " worth $" + A + "\n" + "You sold " + $scope.amount + " ETH @ $" + sellPrice + " worth $" + B;
              $scope.result = "-$" + moneyUSD + "\n" + str;  
            }
            else if(moneyUSD <= 0)
            {
              var str = "You bought " + amount + " ETH @ $" + purchasePrice + " worth $" + A + "\n" + " You sold " + $scope.amount + " ETH @ $" + sellPrice + " worth $" + B;
              $scope.result = "+$" + (-moneyUSD) + "\n" + str + "\n" + "Tax on profit is $"  + tax;  
            }
            break;
          }
    }

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
});