
 
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
        console.log("Looks like your first ajax request was sent");
        getData(result);
    }).fail(function(jqXHR, error, errorThrown){ //stays common element
        var errorElem = showError(error); //stays common element
        $('.search-results').append(errorElem); //stays common element
    });
};


var getUser = function () {
    var  userinformation = {
        userID: 'self', //stays
        v: '20140630'
    }; 
    var resultinfo = $.ajax({
        url: "https://api.foursquare.com/v2/users/self?oauth_token="+access_token,
        data: userinformation, //stays
        dataType: "jsonp",  //stays
        type: "GET"  //stays
    }).done(function(resultinfo){
         console.log("Looks like your second ajax request was sent");
        getUserData(resultinfo);
    }).fail(function(jqXHR, error, errorThrown){ //stays common element
        var errorElem = showError(error); //stays common element
        $('.search-results').append(errorElem); //stays common element
    });
};

var getData = function(result) {
 
    $('.checkin').html('<p>' + result.response.checkins.count + '</p>');
    
    var items = result.response.checkins.items;
    var country = new Array();

    for (i=0; i < items.length; i++) {
    var newCountry = items[i].venue.location.country;
    country.push(newCountry);}


    function showUnique(country) {
    var a = [], b = [], prev;

    country.sort();
    for ( var i = 0; i < country.length; i++ ) {

    if ( country[i] !== prev ) {
    a.push(country[i]);
    b.push(1);
    } else {
    b[b.length-1]++;
    }
    prev = country[i];
    }

    return [a, b];}

   var countryResult = showUnique(country);
   for (i=0;i < countryResult[0].length;i++) {
   console.log(countryResult[0][i]+" "+countryResult[1][i]);}

   $('.country').html('<p>' +countryResult[0].length + '</p>');
   $('#fcountry').html(countryResult[0].length);


    var city = new Array();
    for (j=0; j < items.length; j++) {
    var newCity = items[j].venue.location.city;
    city.push(newCity);}


    function Unique(city) {
    var c = [], d = [], preve;

    city.sort();
    for ( var j = 0; j < city.length; j++ ) {

    if ( city[j] !== preve ) {
    c.push(city[j]);
    d.push(1);
    } else {
    d[d.length-1]++;
    }
    preve = city[j];
    }

    return [c, d];}

   var cityResult = Unique(city);
   for (j=0;j < cityResult[0].length;j++) {
   console.log(cityResult[0][j]+" "+cityResult[1][j]);}

   $('.city').html('<p>' + cityResult[0].length + '</p>');
   $('#fcity').html(cityResult[0].length);

};


var getUserData = function(resultinfo) {
    console.log(resultinfo);
    $('.userpic').html('<img src =' + 'https://irs1.4sqi.net/img/user/128x128' + resultinfo.response.user.photo.suffix + '>');
    $('.username, #fname').html( resultinfo.response.user.firstName );
    $('.homecity').html(resultinfo.response.user.homeCity);
    $('.badges').html(resultinfo.response.user.badges.count + " FourSquare badges");
};


$(document).ready(function() {
    if (access_token == null) {       
        $('.dashboardProfile').hide();   
        $('.dashboardInfo').hide(); 
        $('.dashboardConnect').show();
         $('.footer2').hide();
        $('.footer').show();   
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
        $('.footer2').show();
        $('.footer').hide();
        getCheckin();
        getUser();
    }
});
