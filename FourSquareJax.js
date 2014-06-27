
   //gets Authentication Code
var access_token;        
    if (window.location.hash) 
        {
                                       
            access_token = window.location.hash.split('=')[1];
        }
   $(document).ready(function() {
    var foursquareApi = {
                clientId: "4B4T220TQF43NIUKJAQI1DNASEOI12NBTTUNZ5YOETDDQORF",
                clientSecret: "YDBCTHJECBNMQVFWRC1GU5RFGGPHRY4Y1VGHSVD4PLMGRKNB",
                redirectUrl : "http://almontas.github.io/FourSquareJax/",

    if (access_token.length < 1)
    {         
        $('.connect').click (function ()
            {   
                  document.getElementById('dashboardProfile').style.display=='none';   
                  document.getElementById('dashboardInfo').style.display=='none';   
                var url = "https://foursquare.com/oauth2/access_token";
                    url += "?client_id="+foursquareApi.clientId;
                    url += "&response_type=token";
                    url += "&redirect_uri="+foursquareApi.redirectUrl;
                    window.location = url;
                          
            });
    }
    else 
    {

    }           




                //gets parameter from above sends request back to API

                //insert function to be sent into API
                var getCheckin = function () {

                var  userrequest = {userID: self, //stays
                                    limit: 100,  
                                    sort: 'newestfirst'  
                                    };  
        
                var result = $.ajax({
                        url: "https://api.foursquare.com/v2/users/self/checkins?oauth_tokens="+access_token,  
                        data: userrequest, //stays
                        dataType: "jsonp",  //stays
                        type: "GET",  //stays
                        })
                .done(function(result){
                        getData(result);
                    });
                })
                .fail(function(jqXHR, error, errorThrown){ //stays common element
                    var errorElem = showError(error); //stays common element
                    $('.search-results').append(errorElem); //stays common element
                })



                //insert funtion to inject variable into API
                },
                getData: function(result){
                    
                    var selfcheckin;
                    $('.checkin').html(result.response.checkins.count);
                   

                    var countries;
                    countries.text(result.response.checkins.items.venue.country); // NEED TO LOOP THROUGH THIS
                    $('.country').append(countries);

                    var cities
                    cities.text(result.response.checkins.items.venue.city); // NEED TO LOOP THROUGH THIS
                    $('.city').append(countries);

                }
                
            };
    };
  });