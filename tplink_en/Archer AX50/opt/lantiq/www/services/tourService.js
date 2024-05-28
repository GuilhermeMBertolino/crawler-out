myapp.service('tourService', function ($rootScope, languageService) {
    var tour = null;
    this.setTour = function(helpTourPage){
        var language = languageService.getObject();
                 if(language === undefined){
                     language = 'en';
                 }
        
        var languageFilePath = "/helpPage/" + language + "/" +helpTourPage + ".json";
        $.getJSON(languageFilePath, function (data) {
                    tour = new Tour({
                          storage: window.localStorage,
                          backdrop:true,
                          duration: 4000,
                          steps: data
                    });
                    startTour();
				});
       
     }
    
    var startTour = function(){
       tour.init();
       tour.start();
       restartTour();
    }
    
    var restartTour = function(){
        tour.restart();
    }
    
    
});