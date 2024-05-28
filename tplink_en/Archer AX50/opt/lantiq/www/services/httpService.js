myapp.service('httpService',['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {
   
    return {
            get_url: "cgi_get",
            set_url: "cgi_set",
            set_action_url: URL + "cgi_action",
            get_fillparam_url: "cgi_get_fillparams",
            get_nosubobject_url: "cgi_get_nosubobj",
            getDataWithFormedURL: function(url) {
                   return $http.get(url);
            },
            getAllData: function(urlarray) {
                   var deferred = $q.defer();
                   $q.all(urlarray).then(function(responsearray) {
                    deferred.resolve(responsearray);
                   }, function(error){
                    deferred.reject(error);
                   });
                   return deferred.promise;
            },
        
            getData: function(url) {
                   return $http.get(URL + this.get_url + "?" + url);
            },
        
            getFillParamData: function(url) {
                   return $http.get(URL + this.get_fillparam_url + "?" + url);
            },
            getNoSubObjectData: function(url) {
                   return $http.get(URL + this.get_nosubobject_url + "?" + url);
            },
            setAllData: function(urlarray) {
                   
                   var deferred = $q.defer();
                   $q.all(urlarray).then(function(responsearray){
                    deferred.resolve(responsearray);
                   }, function(error){
                    deferred.reject(error);
                   });
                   return deferred.promise;
            },    
          setData: function(data) {
              var url = URL + this.set_url;
              return $http.post(URL + this.set_url, data);
          },
        
          getRulesJson: function(){
                $.getJSON("rules.json", function (data) {                
                    dependencydata = data;
                });
              
          },
        checkFileExists: function(fileName, filetype){
            var extension =".xml";
            if(filetype === "custom"){
                extension=".html";
            }
            else{
                extension=".xml";
            }
            
            if(Port != ""){
                return $http.post('http://' + IP + ':' + Port + '/' + fileName + extension)
            }
            else{
                return $http.post('http://' + IP + '/' + fileName + extension)
            }
        }
        
           
   }
    

   
  
}]);
