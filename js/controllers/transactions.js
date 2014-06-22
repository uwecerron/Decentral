function TransactionsController($rootScope,$scope, $filter,TransactionFetcher) {
    
    $scope.sortingOrder="";
    $scope.reverse = false;
    $scope.filteredtransactions = [];
    $scope.groupedtransactions = [];
    $scope.transactionsPerPage = 5;
    $scope.pagedtransactions = [];
    $scope.currentPage = 0;

    
    $scope.transactions = [
        {"id":"1","name":"sad","address":"hash 2","balance":"tran hash","token":"2"},
          {"id":"1","name":"qqw","address":"hash 2","balance":"tran hash","token":"5"},
            {"id":"1","name":"weef","address":"hash 2","balance":"tran hash","token":"6"},
              {"id":"1","name":"hash6","address":"hash 2","balance":"tran hash","token":"1"},
                {"id":"1","name":"ffffhasffh5","address":"hash 2","balance":"tran hash","token":"2"},
                  {"id":"1","name":"zzzzhash8","address":"hash 2","balance":"tran hash","token":"3"},
                    {"id":"1","name":"aaaahash9","address":"hash 2","balance":"tran hash","token":"1"}
         
   ];

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredtransactions = $filter('filter')($scope.transactions, function (transactions) {
            for(var attr in transactions) {
                if (searchMatch(transactions[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sortingOrder !== '') {
            console.log("works2")
            $scope.filteredtransactions = $filter('orderBy')($scope.filteredtransactions, $scope.sortingOrder, $scope.reverse);
        }
        // $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };
    
    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedTransactions = [];
        
        for (var i = 0; i < $scope.filteredtransactions.length; i++) {
            if (i % $scope.transactionsPerPage === 0) {
                $scope.pagedTransactions[Math.floor(i / $scope.transactionsPerPage)] = [ $scope.filteredtransactions[i] ];
            } else {
                $scope.pagedTransactions[Math.floor(i / $scope.transactionsPerPage)].push($scope.filteredtransactions[i]);
            }
        }
    };
    
    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedTransactions.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    $scope.search();

    // change sorting order
    $scope.sort_by = function(newSortingOrder) {
       // console.log($scope.sortingOrder);
        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;
        $scope.search();
       console.log($scope.sortingOrder);
    };
	
	function download(data) {
		var a = document.createElement("a");
		var backup = "data:text/csv;charset=utf-8,";
        backup += escape(data);
		a.href = backup;
        a.click();
    };
	
	$scope.generate = function() {
		var outfile = "Name,Address,Balance,Token\n";
		for(var index = 0; index < $scope.transactions.length; index++)
		{
			outfile += $scope.transactions[index]["name"] + ","
					+  $scope.transactions[index]["address"] + ","
					+  $scope.transactions[index]["balance"] + ","
					+  $scope.transactions[index]["token"] + "\n";
		}
		download(outfile);
	};
};

//TransactionsController.$inject = ['$scope', '$filter'];