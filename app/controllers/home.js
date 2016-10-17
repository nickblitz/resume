angular.module('MyApp')
  .controller('HomeController', function($scope) {
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
      summary: 'I started iCapture Marketing out of my parents garage in 2005. It started as a web and UI design company that transformed into development. Over the years I grew the company to over 100 active clients that were from small startups to medium size businesses. During this time not only did I gain a mass amount of development experience but also learned how to manage a business and how to project manage.'
    }];

    $scope.contactForm = {};

    $scope.update = function(data) {
      $scope.contactForm = angular.copy(data);
      console.log($scope.contactForm);
    };
  });
