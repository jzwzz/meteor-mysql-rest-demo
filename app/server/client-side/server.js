import { HTTP } from 'meteor/http'



var SERVER_BASE_URL = 'http://localhost:3000/'


Meteor.methods({
  clientSideHello:function(){

     console.log('in clientSideHello ');


     console.log(SERVER_BASE_URL + "ocpi/emsp/versions");

     try {
         var result = HTTP.call("GET", SERVER_BASE_URL + "ocpi/emsp/versions",
                                {params: {user: '1'}});

          console.log("result:", result);
          console.log("result.headers:", result.headers);

         return true;
       } catch (e) {
         // Got a network error, time-out or HTTP error in the 400 or 500 range.
         console.error(e);
         return false;
       }

     return {abc:'1231'}
  }
});
