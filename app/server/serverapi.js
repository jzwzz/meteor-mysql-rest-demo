
var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    apiPath: 'ocpi/'
  });


  // var BASE_URL = 'https://example.com/'
  var EMSP_BASE_URL = 'http://localhost:3000'

  asyncFunc = function(arg1, arg2, callback) {
          // callback has the form function (err, res) {}

          var mysql      = require('mysql');

          // receive params
          console.log("arg1",arg1);
          console.log("arg2",arg2);

          var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'leaderboard'
          });

          connection.connect();

          connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
            if (err) throw err;

            console.log('The solution is: ', rows[0].solution);

            // return value
            callback(null, rows[0].solution);


          });

          connection.end();

  };

  Api.addRoute('emsp/versions', {authRequired: false}, {
    get: function () {
      console.log('>>> emsp/versions()');

      var returnValue = getBaseResult();

      returnValue.data = [
        {
          version: '2.0',
          url: EMSP_BASE_URL + '/ocpi/cpo/2.0/'
        }
      ];

      console.log('<<< emsp/versions()');

      return returnValue;
    }
  });

  /* Use a function for the exact format desired... */
  function ISODateString(d) {
      function pad(n) {return n<10 ? '0'+n : n}
      return d.getUTCFullYear()+'-'
           + pad(d.getUTCMonth()+1)+'-'
           + pad(d.getUTCDate())+'T'
           + pad(d.getUTCHours())+':'
           + pad(d.getUTCMinutes())+':'
           + pad(d.getUTCSeconds())+'Z'
  }

/**
 *
 */
 function getBaseResult(){

   var myDate = new Date();

   return {
     data: null,
     status_code: 1000,
     status_message: 'Success',
     timestamp: ISODateString(myDate)
   }
 }

  Api.addRoute('emsp/2.0', {authRequired: false}, {
    get: function () {

      var returnValue = getBaseResult();
      returnValue.data = {
        version: '2.0',
        endpoints: [
              {
                  "identifier": "credentials",
                  "url": EMSP_BASE_URL + "/ocpi/epms/2.0/credentials/"
              }, {
                  "identifier": "locations",
                  "url": EMSP_BASE_URL + "/ocpi/epms/2.0/locations/"
              }, {
                  "identifier": "tokens",
                  "url": EMSP_BASE_URL + "/ocpi/epms/2.0/tokens/"
              }, {
                  "identifier": "cdrs",
                  "url": EMSP_BASE_URL + "/ocpi/epms/2.0/cdrs/"
              }, {
                  "identifier": "commands",
                  "url": EMSP_BASE_URL + "/ocpi/epms/2.0/commands/"
              }, {
                  "identifier": "sessions",
                  "url": EMSP_BASE_URL + "/ocpi/epms/2.0/sessions/"
              }
      ]};

      return returnValue;
    }
  });

  // Maps to: /api/articles/:id
  Api.addRoute('articles/:id', {authRequired: false}, {
    get: function () {

      // wrap
      syncFunc = Meteor.wrapAsync(asyncFunc);

      // call method
      var greetingMessage = syncFunc('1','2');

      console.log("greetingMessage:", greetingMessage);

      return {id:this.urlParams.id , sbc: greetingMessage};
    },
    delete: {
      roleRequired: ['author', 'admin'],
      action: function () {
        if (Articles.remove(this.urlParams.id)) {
          return {status: 'success', data: {message: 'Article removed'}};
        }
        return {
          statusCode: 404,
          body: {status: 'fail', message: 'Article not found'}
        };
      }
    }
  });
