var express = require('express');
var app = express();
var sql = require("mssql");
app.get('/getdata', function (req, res) {
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from student', function (err, recordset) {
            if (err) {
                console.log(err)
             }else{
                // send records as a response
                res.send(recordset);               
             }               
        });
});

var server = app.listen(5000, function () {

    // config for your database
    var config = {
        user: "sa",
        password: "Mcbitss100%",
        server: 'MCBITSSHYD',
        database: "student"
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) {
            console.log(err);
         }
    }) 

});