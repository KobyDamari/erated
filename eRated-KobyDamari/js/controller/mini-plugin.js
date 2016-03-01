eRated.controller('mini-plugin', function(URL,$scope,$rootScope,$http) {
$scope.User = {};
$scope.CurrentTab=0;
var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
   $scope.userVerfied = false;
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();
        $scope.getPlugInInfo = function(){
        ajaxFilter = $http.get(URL.API + "/users/"+QueryString.userId+'?partner=12341234&mode=marketplaces')
        .then(function successCallback(response) {
            if(response.data.success){
            var res=response.data.data;
            $scope.User.userImg = res.profile_image_link;
            var precent = res.total_rating.toString();
            $scope.User.rating =  precent.substring(0,2);
            $scope.User.displayName = res.display_name;
            if( res.social_information.facebook.connections != undefined){
              $scope.User.faceBookConnection = res.social_information.facebook.connections;  
               $scope.User.isFacebookExists=1;
            }else{
                $scope.User.isFacebookExists=0;
            }
            if( res.social_information.facebook.connections != undefined){
             $scope.User.linkedinConnection = res.social_information.linkedin.connections;
              $scope.User.islinkdinExists=1;
            }else{
                $scope.User.islinkdinExists=0;
            }
            $scope.User.twitterConnection = res.social_information.linkedin.connections
            $scope.User.isTop = 1;
             $scope.User.marketsInfo = [];
            for (i=0 ;i<res.relevant_reputation.length ; i++){
               var miniReviews = (res.relevant_reputation[i].reviews).slice(0,3); 
              $scope.User.marketsInfo[i]={'name':res.relevant_reputation[i].name,'marketReviews':miniReviews ,'marketScore':res.relevant_reputation[i].score,'scoreInfo':res.relevant_reputation[i].characteristics}
               
            }
            $scope.setCurrentTab(0);
            if(!$scope.$$phase) $scope.$apply();  
            }
        });   
    };
    $scope.getPlugInInfo();
    $scope.setCurrentTab = function(tabNum){
        $scope.currentTab = tabNum;
        $scope.CurrentTab= $scope.User.marketsInfo[tabNum];
        if($scope.CurrentTab.marketScore>10){
         $scope.CurrentTab.marketScore =Math.round(parseInt($scope.CurrentTab.marketScore)/20);   
        }
        if(!$scope.$$phase) $scope.$apply();  
    }
    
$scope.getTimes=function(n){
     return new Array(n);
};
});