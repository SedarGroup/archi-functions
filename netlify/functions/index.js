var mysql = require('mysql');
exports.handler = (event, context, callback) => {
  const mail = event.queryStringParameters.email;
  var con = mysql.createConnection({
    host: process.env.HOSTNAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });
  con.connect(function (err) {
    if (err) {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify(err)
      })
    }
    console.log("Connected!");
    var sql = `INSERT INTO emails (email) VALUES ('${mail}')`;
    con.query(sql, function (err, result) {
      if (err) {
        callback(null, {
          statusCode: 500,
          body: JSON.stringify(err)
        })
      }
      callback(null, {
        statusCode: 200,
        body: '1 mail inserted'
      })
    });
  });
}