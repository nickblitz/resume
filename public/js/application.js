angular.module('MyApp', ['ngRoute'])
  .config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        controller: 'HomeController',
        templateUrl: 'partials/home.html'
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });


  }])
  .run(["$rootScope", "$window", function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  }]);

angular.module('MyApp')
  .controller('ContactCtrl', ["$scope", "Contact", function($scope, Contact) {
    $scope.sendContactForm = function() {
      Contact.send($scope.contact)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };
  }]);

angular.module('MyApp')
  .controller('ForgotCtrl', ["$scope", "Account", function($scope, Account) {
    $scope.forgotPassword = function() {
      Account.forgotPassword($scope.user)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };
  }]);

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

angular.module('MyApp')
  .controller('HomeController', ["$scope", function($scope) {
    $scope.contact = {};

    $scope.history = [{
      company: 'InstaBrand',
      duration: 'August 2015 - present',
      position: 'Engineering Manager',
      summary: 'Managed a team of 4, helped code review, technical planning of product specs, managed release process, contributed to architecting and building data structure in Neo4j and Elasticsearch, helped create python ETL jobs to transform our data from our SSOT to be indexed into Elasticsearch and Neo4. Contribute architect and feature builds of Django RESTful application and frontend application.'
    },{
      company: 'InstaBrand',
      duration: 'March 2014 - August 2015',
      position: 'CTO',
      summary: 'I built and managed an engineering team of 11 people, implemented agile and scrum practices, setup CI workflows, lead architect on entire angular build and PHP YII2 backend, helped build product team, helped companies achieve series A in funding with viable product and ensured code quality across team. '
    },{
      company: 'Blitz Agency',
      duration: 'October 2013 - March 2014',
      position: 'Web Developer',
      summary: 'I came to Blitz as a private contractor to assist with Vizio’s support center, FX Networks and Hotwheels. Working here was an amazing experience being able to work with other top developers in the field on big name brands expanding my knowledge of the industries latest tech.'
    },{
      company: 'eNiche Solutions',
      duration: 'July 2012 - August 2013',
      position: 'Technical Lead',
      summary: 'In July 2012, eNiche Solutions bought out my company that I have had for the past 8 years and I took over as head developer.  When I joined eNiche Solutions they were a web marketing company, I helped enter them into development which they were then able to dynamically SEO a wider variety of sites. Being apart of eNiche not only allowed me to work on big name projects but also entered me into the SEO game. I learned many schema tricks, how to properly place “natural” backlinks and many other SEO practices that are now involved in my development methods.'
    },{
      company: 'iCapture',
      duration: 'Apirl 2005 - July 2012',
      position: 'Founder / Lead Developer',
      summary: 'I started iCapture Marketing out of my parents garage in 2005. It started as a web and UI design company that transformed into development. Over the years I grew the company to over 100 active clients that were from small startups to medium size businesses. During this time I gained experience building out PHP sites on Zend, CakePHP, Yii, Wordpress and also gained front end experience in HTML and CSS.'
    }];

    $scope.contactForm = {};

    $scope.update = function(data) {
      $scope.contactForm = angular.copy(data);
      console.log($scope.contactForm);
    };
  }]);

angular.module('MyApp')
  .controller('LoginCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function($scope, $rootScope, $location, $window, $auth) {
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/account');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };
  }]);
angular.module('MyApp')
  .controller('ProfileCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", "Account", function($scope, $rootScope, $location, $window, $auth, Account) {
    $scope.profile = $rootScope.currentUser;

    $scope.updateProfile = function() {
      Account.updateProfile($scope.profile)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.changePassword = function() {
      Account.changePassword($scope.profile)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $window.scrollTo(0, 0);
          $scope.messages = {
            error: [response.data]
          };
        });
    };
    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: [response.data]
          };
        });
    };

    $scope.deleteAccount = function() {
      Account.deleteAccount()
        .then(function() {
          $auth.logout();
          delete $window.localStorage.user;
          $location.path('/');
        })
        .catch(function(response) {
          $scope.messages = {
            error: [response.data]
          };
        });
    };
  }]);
angular.module('MyApp')
  .controller('ResetCtrl', ["$scope", "Account", function($scope, Account) {
    $scope.resetPassword = function() {
      Account.resetPassword($scope.user)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    }
  }]);

angular.module('MyApp')
  .controller('SignupCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function($scope, $rootScope, $location, $window, $auth) {
    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };
  }]);
angular.module('MyApp')
  .factory('Account', ["$http", function($http) {
    return {
      updateProfile: function(data) {
        return $http.put('/account', data);
      },
      changePassword: function(data) {
        return $http.put('/account', data);
      },
      deleteAccount: function() {
        return $http.delete('/account');
      },
      forgotPassword: function(data) {
        return $http.post('/forgot', data);
      },
      resetPassword: function(data) {
        return $http.post('/reset', data);
      }
    };
  }]);
angular.module('MyApp')
  .factory('Contact', ["$http", function($http) {
    return {
      send: function(data) {
        return $http.post('/contact', data);
      }
    };
  }]);
'use strict';

angular.module('MyApp')
    .directive('scroll', ["$window", function ($window) {
        return {
          restrict: 'A',
          link: function (scope, element, attrs) {
            var sectionWelcomeHeight,
                ninjaSelector = '#ninja',
                ninjaWidth,
                scrollPercentage,
                ninjaNewWidth,
                step = 5,
                lastScrollPercentage = 0;
            scope.headerClass = false;
            angular.element($window).bind('scroll', function () {
                 
                 /**
                  * get height of welcome area if not set
                  * @type {Integer}
                  */
                 sectionWelcomeHeight = (!sectionWelcomeHeight) ? $('#sec-welcome').height() : sectionWelcomeHeight;

                 /**
                  * set header class when scroll pass welcome area
                  */
                 if (this.pageYOffset >= sectionWelcomeHeight && scope.headerClass === false) {
                     scope.headerClass = true;

                 /**
                  * unset header class and size images when scrolling
                  */
                 } else if (this.pageYOffset < sectionWelcomeHeight) {
                     
                     ninjaWidth = (!ninjaWidth) ? $(ninjaSelector).width() : ninjaWidth;
                     scrollPercentage = this.pageYOffset / sectionWelcomeHeight;

                     /**
                      * apply step to when to adjust size for better easing
                      */
                     if((Math.round(scrollPercentage * 100) > (lastScrollPercentage + step)) ||
                      (Math.round(scrollPercentage * 100) < (lastScrollPercentage - step))
                      ) {
                        lastScrollPercentage = Math.round(scrollPercentage * 100);
                        ninjaNewWidth = Math.round(scrollPercentage * ninjaWidth);
                        $(ninjaSelector).width(ninjaWidth - ninjaNewWidth + 'px');
                     }
                     
                    
                     if (scope.headerClass === true) {
                        scope.headerClass = false;
                     }
                 }


                scope.$apply();
            });
          }
        };
    }])
    /**
     * directive for scrolling to anchors on page
     * ex: <a href="#my-anchor" scroll-page>Go to anchor</a>
     */
    .directive('scrollPage', function() {
        return {
          restrict: 'A',
          link: function(scope, element, attr) {
            $(element).click(function(e) {
              var offset = (attr.href !== '#sec-skills' && attr.href !== '#sec-welcome') ? 74 : 0;
              e.preventDefault();
              if ($(attr.href)) {
                $('html, body').animate({
                  scrollTop: $(attr.href).offset().top - offset
                }, 1000);
              }
            });
          }
        };
    });