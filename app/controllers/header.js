angular.module('MyApp')
  .controller('HeaderController', ['$scope', '$location', '$window', 
    function($scope, $location, $window) {
      $scope.isCollapsed = true;
      var sectionWelcomeHeight;
      $scope.toggleCollapsibleMenu = function() {
        $scope.isCollapsed = !$scope.isCollapsed;
      };

      angular.element($window).bind('scroll', function () {
        $scope.isCollapsed = true;
      });

      
    }
  ]);
