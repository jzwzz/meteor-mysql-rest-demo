
var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });


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
