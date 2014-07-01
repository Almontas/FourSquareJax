
 
//gets Authentication Code
var access_token;        
if (window.location.hash) {
    access_token = window.location.hash.split('=')[1];
}

var foursquareApi = {
    clientId: "4B4T220TQF43NIUKJAQI1DNASEOI12NBTTUNZ5YOETDDQORF",
    clientSecret: "YDBCTHJECBNMQVFWRC1GU5RFGGPHRY4Y1VGHSVD4PLMGRKNB",
    redirectUrl : "http://almontas.github.io/FourSquareJax/"
}

var getCheckin = function () {
    var  userrequest = {
        userID: 'self', //stays
        limit: 100,  
        sort: 'newestfirst',
        v: '20140630'
    }; 
    var result = $.ajax({
        url: "https://api.foursquare.com/v2/users/self/checkins?oauth_token="+access_token,
        data: userrequest, //stays
        dataType: "jsonp",  //stays
        type: "GET"  //stays
    }).done(function(result){
        console.log("Looks like your ajax request was sent");
        getData(result);
    }).fail(function(jqXHR, error, errorThrown){ //stays common element
        var errorElem = showError(error); //stays common element
        $('.search-results').append(errorElem); //stays common element
    });
};

var getData = function(result) {
    console.log("Looks like your function was fired off");
    $('.checkin').html(result.response.checkins.count);
    
    var items = result.response.checkins.items;
    console.log(items);

    for (i=0; i<=items.length; i++) {
    var country = items.venue.location[i];
    console.log(country);
    }
    
   
   
};

$(document).ready(function() {
    if (access_token == null) {       
        $('.dashboardProfile').hide();   
        $('.dashboardInfo').hide(); 
        $('.dashboardConnect').show();   
        $('.connect').click(function() {   
            var url = "https://foursquare.com/oauth2/authenticate";
                url += "?client_id="+foursquareApi.clientId;
                url += "&response_type=token";
                url += "&redirect_uri="+foursquareApi.redirectUrl;
                window.location = url;
        });
    } else {
        console.log("Hello this is your code: " + access_token);
        $('.dashboardProfile').show();   
        $('.dashboardInfo').show();
        $('.dashboardConnect').hide();
        getCheckin();
    }
});
