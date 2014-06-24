var foursquareApi = {
            clientId: "4B4T220TQF43NIUKJAQI1DNASEOI12NBTTUNZ5YOETDDQORF",
            clientSecret: "YDBCTHJECBNMQVFWRC1GU5RFGGPHRY4Y1VGHSVD4PLMGRKNB",
            redirectUrl : "http://almontas.github.io/FourSquareJax/",
            

            

//on CLICK FUNCTION 

            //authorizes my app 
            authorize: function(){
                var url = "https://foursquare.com/oauth2/access_token";
                    url += "?client_id="+this.clientId;
                    url += "&response_type=token";
                    url += "&redirect_uri="+this.redirectUrl;



                    this.getJson(url, function(data){
                        console.log("authorize",data);
                    })  //what does this do?
            },
            
            //gets Authentication Code
            getCode : function(){
                var url = "http://almontas.github.io/FourSquareJax/";
                    url += "#access_token=ACCESS_TOKEN";
    
                    this.getJson(url, function(data){
                        console.log("ACCESS_TOKEN",data);
                    })  //what does this do?



            //gets parameter from above sends request back to API
            },
            getJson: function(url, callback){
                $.getJSON(url, function(data) {
                  callback(data);
                });//what does this do?


            //insert function to be sent into API
            var getCheckin = function () {

            var  userrequest = {userID: self, //stays
                                limit: 100,  
                                sort: 'newestfirst'  
                                };  
    
            var result = $.ajax({
                    url: "https://api.foursquare.com/v2/users/USER_ID/checkins?oauth_tokens="+access_token,  
                    data: userrequest, //stays
                    dataType: "jsonp",  //stays
                    type: "GET",  //stays
                    })
            .done(function(result){
               
                });
            })
            .fail(function(jqXHR, error, errorThrown){ //stays common element
                var errorElem = showError(error); //stays common element
                $('.search-results').append(errorElem); //stays common element
            })



            //insert funtion to inject variable into API
            },
            getData: function(){
                
                var selfcheckin;
                selfcheckin.text(result.response.checkins.count);
                $('.checkin').append(selfcheckin);

                var countries;
                countries.text(result.response.checkins.items.venue.country); // NEED TO LOOP THROUGH THIS
                $('.country').append(countries);

                var cities
                cities.text(result.response.checkins.items.venue.city); // NEED TO LOOP THROUGH THIS
                $('.city').append(countries);

            }
            
        };