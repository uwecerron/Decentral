function IssueController($scope,DecentralStorage) {

  $scope.pageClass = 'page-assets';
  $scope.formData={};
    $scope.error={}
     var sendInfo = { name: 'caca',
      superheroAlias: 'sfa'};
  
$scope.processForm = function() {
  console.log('submitted');
   //$scope.formData;
};
}