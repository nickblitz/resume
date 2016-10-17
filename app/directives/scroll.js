'use strict';

angular.module('MyApp')
    .directive('scroll', function ($window) {
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
    })
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